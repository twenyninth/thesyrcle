/**
 * SYRCLE JERSEYS - Google Apps Script Backend
 * 
 * INSTRUCTIONS:
 * 1. Go to sheets.google.com and create a new blank spreadsheet.
 * 2. Add headers to the first row (A1 to G1):
 *    Timestamp | Product | Jerseys Details | Full Name | Email | Phone | Address
 * 3. Click Extensions > Apps Script.
 * 4. Erase any code in the editor and PASTE THIS ENTIRE FILE into it.
 * 5. Click the "Save" icon (disk).
 * 6. Click "Deploy" > "New deployment" at the top right.
 * 7. Click the gear icon next to "Select type" and choose "Web app".
 * 8. Set "Execute as" to "Me".
 * 9. Set "Who has access" to "Anyone".
 * 10. Click "Deploy" (You may need to authorize access to your Google Account).
 * 11. Copy the generated "Web app URL" and paste it into `script.js` in your Syrcle project!
 */

function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  // Prevent CSV/Formula Injection (starts with =, +, -, @)
  if (/^[=+\-@]/.test(input)) {
    input = "'" + input;
  }
  // Strip out basic HTML tags
  return input.replace(/<[^>]*>?/gm, '');
}

function doPost(e) {
  // 1. Anti-Bot Honeypot Check
  if (e.parameter.website && e.parameter.website.length > 0) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 2. Extract and Sanitize parameters
  var product = sanitizeInput(e.parameter.product || "N/A");
  var fullName = sanitizeInput(e.parameter.full_name || "N/A");
  var email = sanitizeInput(e.parameter.email || "N/A");
  var phone = sanitizeInput(e.parameter.phone || "N/A");
  var address = sanitizeInput(e.parameter.address || "N/A");
  
  // 3. Parse jerseys JSON
  var jerseysDetail = "N/A";
  try {
    var jerseysRaw = e.parameter.jerseys || "[]";
    var jerseys = JSON.parse(jerseysRaw);
    if (Array.isArray(jerseys) && jerseys.length > 0) {
      jerseysDetail = jerseys.map(function(j, i) {
        var name = sanitizeInput(j.name || "empty");
        var number = sanitizeInput(j.number || "empty");
        var size = sanitizeInput(j.size || "N/A");
        var sleeve = sanitizeInput(j.sleeve || "N/A");
        return "Name=" + name + ", Number=" + number + ", Size=" + size + ", Sleeve=" + sleeve;
      }).join(" | ");
    }
  } catch (parseError) {
    jerseysDetail = "Parse Error";
  }
  
  // 4. Enforce simple length limits
  if (fullName.length > 100 || address.length > 500 || email.length > 254) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": "Input too long" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // Prepare row data
  var rowData = [
    new Date(), // Timestamp
    product,
    jerseysDetail,
    fullName,
    email,
    phone,
    address
  ];
  
  try {
    sheet.appendRow(rowData);
    
    // Send Telegram notification
    sendTelegramNotification(product, jerseysDetail, fullName, email, phone, address);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Sends a Telegram message with order details via Bot API.
 */
function sendTelegramNotification(product, jerseysDetail, fullName, email, phone, address) {
  var BOT_TOKEN = "7965913278:AAEtNQNc81DREN3NaLkdXxbN-2AgYsZf5t4";
  var CHAT_ID = "808774220";
  
  var message = "🛒 *New SYRCLE Order!*\n\n"
    + "📦 *Product:* " + product + "\n"
    + "👕 *Details:* " + jerseysDetail + "\n\n"
    + "👤 *Customer:* " + fullName + "\n"
    + "📧 *Email:* " + email + "\n"
    + "📞 *Phone:* " + phone + "\n"
    + "📍 *Address:* " + address;
  
  var url = "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage";
  
  try {
    UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      })
    });
  } catch (telegramError) {
    // Log error but don't fail the order
    Logger.log("Telegram notification failed: " + telegramError.message);
  }
}
