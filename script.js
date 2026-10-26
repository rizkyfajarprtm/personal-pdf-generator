document
    .getElementById("documentForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        // Mengambil library jsPDF
        const { jsPDF } = window.jspdf;

        // Membuat dokumen PDF ukuran A4
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        // Mengambil data dari formulir
        const nomor = document.getElementById("nomor").value;
        const nama = document.getElementById("nama").value;
        const departemen = document.getElementById("departemen").value;
        const tanggal = document.getElementById("tanggal").value;
        const deskripsi = document.getElementById("deskripsi").value;

        // Judul dokumen
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);

        doc.text(
            "FORM DOKUMENTASI QUALITY",
            105,
            25,
            { align: "center" }
        );

        // Garis pembatas
        doc.setLineWidth(0.5);
        doc.line(20, 32, 190, 32);

        // Isi dokumen
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        const data = [
            ["Nomor Dokumen", nomor],
            ["Nama Pemohon", nama],
            ["Departemen", departemen],
            ["Tanggal Dokumentasi", tanggal]
        ];

        let y = 48;

        data.forEach(function (item) {
            doc.setFont("helvetica", "bold");
            doc.text(item[0], 20, y);

            doc.setFont("helvetica", "normal");
            doc.text(":", 75, y);
            doc.text(String(item[1]), 80, y);

            y += 12;
        });

        // Bagian deskripsi
        y += 5;

        doc.setFont("helvetica", "bold");
        doc.text("Deskripsi Dokumentasi:", 20, y);

        y += 10;

        doc.setFont("helvetica", "normal");

        const deskripsiLines = doc.splitTextToSize(
            deskripsi,
            165
        );

        doc.text(deskripsiLines, 20, y);

        // Area tanda tangan
        y += deskripsiLines.length * 6 + 25;

        if (y > 245) {
            doc.addPage();
            y = 40;
        }

        doc.text("Disetujui oleh,", 130, y);
        doc.text("Penanggung Jawab Quality", 130, y + 7);
        doc.text("(____________________)", 130, y + 35);

        // Membuat nama file berdasarkan nomor dokumen
        const namaFile = nomor
            .trim()
            .replace(/[^a-zA-Z0-9_-]/g, "_");

        // Mengunduh PDF
        doc.save(`Dokumentasi_${namaFile || "Quality"}.pdf`);

    });
