const SHEET_NAME = "Respuestas";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const sheet = getSheet_();

    sheet.appendRow([
      new Date(),
      data.nombre || "",
      data.conocidos || "",
      data.por_conocer || "",
      data.plan || "",
      data.detalle || "",
      data.ritmo || "",
      data.imprescindible || ""
    ]);

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function doGet(e) {
  const callback = e.parameter.callback || "";
  const action = e.parameter.action || "";
  const suppliedKey = e.parameter.key || "";
  const adminKey = PropertiesService.getScriptProperties().getProperty("ADMIN_KEY");

  let result;

  if (action !== "list") {
    result = { ok: true, message: "API Ruta Secreta activa" };
  } else if (!adminKey || suppliedKey !== adminKey) {
    result = { ok: false, error: "Clave incorrecta." };
  } else {
    const sheet = getSheet_();
    const values = sheet.getDataRange().getDisplayValues();
    const rows = values.slice(1).map(r => ({
      fecha: r[0],
      nombre: r[1],
      conocidos: r[2],
      por_conocer: r[3],
      plan: r[4],
      detalle: r[5],
      ritmo: r[6],
      imprescindible: r[7]
    }));
    result = { ok: true, rows };
  }

  const text = JSON.stringify(result);
  if (callback) {
    return ContentService
      .createTextOutput(callback + "(" + text + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(text)
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Fecha", "Nombre", "Pueblos conocidos", "Pueblos por conocer",
      "Plan favorito", "Detalle feliz", "Ritmo de viaje", "No puede faltar"
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}