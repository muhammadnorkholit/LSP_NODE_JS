const puppeteer = require("puppeteer");
const mysql = require("mysql");
const handlebars = require("handlebars");
const fs = require("fs");
const Siswa = require("../models/Siswa");
const archiver = require("archiver");
const XlsxTemplate = require("xlsx-template");
const XlsPopulate = require("xlsx-populate");

// Koneksi ke MySQL

// Kompilasi template Handlebars
const template = fs.readFileSync("./export/template.hbs", "utf-8");
const compiledTemplate = handlebars.compile(template);

// Compile template menggunakan Handlebars
// Query data dari MySQL
const exportPDf = async (data, res) => {
  data.forEach((d, i) => {
    createPDF(d, i, data.length - 1, res);
  });
};
const margin = {
  top: "10mm",
  right: "10mm",
  bottom: "10mm",
  left: "23mm",
};
// Fungsi untuk membuat PDF
async function createPDF(data, index, totalData, res) {
  let folderPath =
    "export/file/pdf/" + data.jurusan.nama.trim().replace(/ /g, "_");
  const zipFilePath = folderPath + ".zip";

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  } else if (fs.existsSync(folderPath) && index == 0) {
    fs.rmdirSync(folderPath, { recursive: true });
  }
  if (fs.existsSync(zipFilePath)) {
    fs.unlinkSync(zipFilePath);
  }
  const pdfPath = `${folderPath}/${data.nama}.pdf`;

  // Cek apakah file PDF sudah ada
  if (fs.existsSync(pdfPath)) {
    // Hapus file PDF yang sudah ada
    fs.unlinkSync(pdfPath);
  }
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Path file ZIP yang akan dibuat
  // Membuat file ZIP
  // Mengisi template Handlebars dengan data
  let dataConvert = {
    nama: data.nama,
    nisn: data.nisn,
    jurusan: { nama: data?.jurusan.nama },
    penilaians: data.penilaians.map((s, no) => ({
      statusK: s.status == 1 ? "✓" : "",
      statusBK: s.status == 0 ? "✓" : "",
      no: no + 1,
      catatan: s.catatan,
      klaster: {
        kompetensi_keahlian: s.klaster.kompetensi_keahlian,
        klaster: s.klaster.klaster,
      },
      element_uji: {
        nama: s.element_uji.nama,
        kode_unit: s.element_uji.kode_unit,
      },
    })),
  };
  const html = compiledTemplate(dataConvert);

  // Menggunakan HTML yang dihasilkan untuk membuat file PDF
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.pdf({
    path: pdfPath,
    format: "A4",
    margin,
  });
  process.setMaxListeners(40);
  if (index == totalData) {
    await createZip(folderPath, zipFilePath);

    const fileName = data.jurusan.nama.trim().replace(/ /g, "_") + ".zip";

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    const fileStream = fs.createReadStream(zipFilePath);
    fileStream.pipe(res);
  }

  await browser.close();

  console.log(`PDF dengan ID ${data.nama} telah berhasil dibuat.`);
}

const createZip = async (folderPath, zipFilePath) => {
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  output.on("close", () => {
    console.log(`ZIP file created: ${zipFilePath}`);
  });

  archive.on("error", (err) => {
    throw err;
  });

  archive.pipe(output);
  archive.directory(folderPath, false);
  await archive.finalize();
};

const exportExcel = async (datas, res) => {
  const templatePath = "./export/templete2.xlsx";
  const workbook = await XlsPopulate.fromFileAsync(templatePath);
  const worksheet = workbook.sheet(0);
  let border = {
    border: true,
    borderColor: "black",
    verticalAlignment: "center",
    horizontalAlignment: "center",
    wrapText: true,
  };
  let headerRow = [
    "D14",
    "E14",
    "F14",
    "G14",
    "H14",
    "I14",
    "J14",
    "K14",
    "L14",
    "M14",
    "N14",
    "O14",
    "P14",
    "Q14",
    "R14",
    "S14",
    "T14",
    "U14",
    "V14",
    "W14",
    "X14",
    "Y14",
    "Z14",
    "AA14",
    "AB14",
    "AC14",
    "AD14",
    "AE14",
    "AF14",
    "AG14",
  ];

  datas.map(async (data, i) => {
    try {
      const outputPath = "./export/contoh.xlsx";
      if (fs.existsSync(outputPath) && i == 0) {
        fs.unlinkSync(outputPath);
      }
      let totalKompeten = 0;
      let lastDataNumber = 0;
      // Baca template Excel

      // let namaJurusan = worksheet.cell("A1").value();
      // const regexJ = new RegExp(`{{jurusan}}`, "g");
      // namaJurusan = namaJurusan.replace(regexJ, data.jurusan.nama);
      let namaJurusan = worksheet.cell("A9").value();
      const regexJ = new RegExp(`{{jurusan}}`, "g");
      namaJurusan = namaJurusan.replace(regexJ, data.jurusan.nama);
      let tahun = worksheet.cell("A11").value();
      const regexT = new RegExp(`{{tahun}}`, "g");
      tahun = tahun.replace(regexT, new Date().getFullYear());
      let currentRow = 15;
      worksheet.cell("A9").value(namaJurusan);
      worksheet.cell("A11").value(tahun);
      // worksheet.column("B").width(20);
      worksheet.cell("A14").style(border);
      worksheet.cell(`A${currentRow + (i + 1)}`).value(i + 1);
      worksheet.cell(`A${currentRow + (i + 1)}`).style(border);
      worksheet.cell("B14").style(border);
      worksheet.cell("C14").style(border);

      data.penilaians.map((s, j) => {
        totalKompeten += s.status == 1 ? 1 : 0;
        worksheet.cell(headerRow[j].replace("14", "15")).value(j + 1);
        worksheet.cell(headerRow[j].replace("14", "15")).style(border);
        worksheet.column(headerRow[j]).width(-1);
        worksheet.column(headerRow[j].replace("14", "")).width(4);
      });
      worksheet.cell(`B${currentRow + (i + 1)}`).value(data.nama);
      worksheet
        .cell(`B${currentRow + (i + 1)}`)
        .style({ ...border, horizontalAlignment: "left" });
      worksheet
        .cell(`C${currentRow + (i + 1)}`)
        .value(
          data?.tingkatan + " " + data?.jurusan.kode + " " + data?.no_kelas
        );
      worksheet
        .cell(`C${currentRow + (i + 1)}`)
        .style({ ...border, horizontalAlignment: "center" });

      data.penilaians.map((s, j) => {
        let value = headerRow[j].replace("14", currentRow + (i + 1));
        worksheet.cell(value).value(s.status == 1 ? "✓" : null);
        worksheet
          .cell(value)
          .style({ ...border, horizontalAlignment: "center" });
        lastDataNumber = currentRow + (i + 1);
        if (data.penilaians.length - 1 == j) {
          worksheet
            .cell(headerRow[j + 1].replace("14", currentRow + (i + 1)))
            .style({ ...border, horizontalAlignment: "center" });
          worksheet
            .cell(headerRow[j + 1].replace("14", currentRow + (i + 1)))
            .value(totalKompeten == 0 ? "" : totalKompeten);
        }
      });

      if (i == datas.length - 1) {
        worksheet.cell(`A${lastDataNumber + 3}`).value("Keterangan : ");
        worksheet
          .cell(`A${lastDataNumber + 3}`)
          .style({ horizontalAlignment: "left" });
        data.penilaians.map((s, j) => {
          worksheet.cell(`A${lastDataNumber + 3 + (j + 1)}`).value(j + 1);
          worksheet
            .cell(`A${lastDataNumber + 3 + (j + 1)}`)
            .style({ horizontalAlignment: "center" });
          worksheet
            .cell(`B${lastDataNumber + 3 + (j + 1)}`)
            .value(s.element_uji.nama);

          if (data.penilaians.length - 1 == j) {
            worksheet
              .cell(`K${lastDataNumber + 3 + (j + 1) + 1}`)
              .value("Bondowoso_________________");
            worksheet
              .cell(`K${lastDataNumber + 3 + (j + 1) + 2}`)
              .value("Asesor");
            worksheet
              .cell(`K${lastDataNumber + 3 + (j + 1) + 8}`)
              .value(data?.user?.nama);
          }
        });
        await workbook.toFileAsync(outputPath);
        const fileName = data.jurusan.nama.trim().replace(/ /g, "_") + ".xlsx";

        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${fileName}"`
        );

        const fileStream = fs.createReadStream(outputPath);
        fileStream.pipe(res);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat ekspor Excel:", error);
    }
  });
};
const createExcel = async (data, i) => {};
module.exports = { exportPDf, exportExcel };
