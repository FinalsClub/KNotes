TODO: Write readme


Other TODOs, see TODO file

File Uploading

I've dropped in blueimp's file uploading service (/node_modules/blueimp-file-upload-node/server.js) because it's very well documented (https://github.com/blueimp/jQuery-File-Upload/wiki/API), and falls back to iframe transport for ye olde browsers. 

*Note* For now, you must explicitly run the upload service (/node_modules/blueimp-file-upload-node/server.js) before testing with /index.html.

Files are currently stored in /node_modules/blueimp-file-upload-node/public