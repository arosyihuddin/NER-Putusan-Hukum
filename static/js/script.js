var droppedFiles = [];
function drop(e) {
  e.preventDefault();
  e.stopPropagation();

  var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;

  if (files.length > 0) {
    droppedFiles = files;
    handleFiles(files);
  }
}

function handleFiles(files) {
  var fileList = $("#file-list");
  fileList.empty();

  $.each(files, function (index, file) {
    fileList.append('<div class="file">' + file.name + "</div>");
  });

  // Simulate file upload with a delay (for animation purpose)
  fileList.append('<div class="uploading">Uploading...</div>');

  // Anda dapat menghapus simulasi ini dan langsung memanggil showNextButton() jika diperlukan
  setTimeout(function () {
    fileList.empty();
    fileList.append(
      '<div class="uploaded">File(s) uploaded successfully!</div>'
    );
    // Tampilkan tombol Next setelah file berhasil diupload
    showNextButton();
  }, 3000);
}

function dragEnter(e) {
  e.preventDefault();
  e.stopPropagation();
  $("#drop-zone").addClass("hover");
}

function dragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  $("#drop-zone").removeClass("hover");
}

function dragOver(e) {
  e.preventDefault();
  e.stopPropagation();
}

function showNextButton() {
  $("#next-btn").show();
  $("#model-dropdown").show();
}

function processFiles() {
  // Tampilkan loading overlay
  $("#loading-overlay").show();

  // Dapatkan file yang berhasil diupload
  var files =
    droppedFiles.length > 0 ? droppedFiles : $("#file-input")[0].files;

  // Buat FormData objek untuk mengirim file ke server
  var formData = new FormData();
  for (var i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  // Kirim file ke server menggunakan AJAX
  $.ajax({
    url: "/uploads", 
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function (response) {
      console.log(response);
      setTimeout(function () {
        // Sembunyikan loading overlay setelah selesai
        $("#loading-overlay").hide();
    
        // Setelah selesai, pindah halaman
        window.location.href = "/"; // Ganti dengan URL halaman yang diinginkan
      }, 2000);    
    },
    error: function (error) {
      console.error(error);
      $("#loading-overlay").hide();
      // Implementasikan logika untuk menanggapi kesalahan dari server
    },
  });
}

$(document).ready(function () {
  var dropZone = $("#drop-zone");
  var fileInput = $("#file-input");

  dropZone.on("drop", function (e) {
    dropZone.removeClass("hover");
    var files = e.originalEvent.dataTransfer.files;
    handleFiles(files);
  });

  fileInput.change(function () {
    var files = this.files;
    handleFiles(files);
  });
});
