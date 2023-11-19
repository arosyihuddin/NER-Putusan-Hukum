from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename
import os
import uuid

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = 'static/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/uploads', methods=['POST'])
def uploads():
    if request.method == 'POST':
        # Pastikan 'files' adalah nama yang sesuai dengan FormData.append() di JavaScript
        files = request.files.getlist('files')
        if not files:
            return "No files provided."
        
        for file in files:
            if allowed_file(file.filename):
                # Menggunakan UUID untuk memastikan nama unik
                filename, file_extension = os.path.splitext(file.filename)
                unique_filename = str(uuid.uuid4()) + '_' + \
                    secure_filename(file.filename) + file_extension

                # Simpan file
                file.save(os.path.join(
                    app.config["UPLOAD_FOLDER"], unique_filename))
        return redirect(url_for("index"))

@app.route("/legalner", methods=["GET"])
def legalNER():
    return render_template('tes.html')


if __name__ == '__main__':
    app.run(debug=True)
