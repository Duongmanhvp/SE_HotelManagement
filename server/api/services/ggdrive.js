const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const uploadsFileToDrive = async (req, res, next) => {
  const roomImg = req.file;
  await drive.files
    .create({
      requestBody: {
        name: roomImg.filename,
        mimeType: "image/jpeg",
      },
      media: {
        mimeType: "image/jpeg",
        body: fs.createReadStream(
          path.join(__dirname, "../../uploads/", roomImg.filename)
        ),
      },
    })
    .then((driveImg) => {
      req.body.images = {};
      req.body.images.picture_url = `https://drive.google.com/uc?export=view&id=${driveImg.data.id}`;
      console.log(req.body);
      fs.unlink(
        path.join(__dirname, "../../uploads/", roomImg.filename),
        () => {
          console.log("Deleted file sucessfully!");
        }
      );
    })
    .then(next());
};

module.exports = { uploadsFileToDrive };
