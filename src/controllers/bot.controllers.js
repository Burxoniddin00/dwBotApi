import Bot from "../models/bot.module.js";
import fs from "fs";
import ytdl from "ytdl-core";
import TelegramBot from "node-telegram-bot-api";
import path from "path";
const Token = "6782560026:AAG9LUwfpaighRiLh2JHWK5pdBAPqq-8Kqc";
const bot = new TelegramBot(Token, { polling: true });

export const Get = (req, res) => {
  try {
    res.send("ok");
  } catch (error) {
    console.log(error.message);
  }
};

export const Post = async (req, res) => {
  try {
    const { vidLink, username, first_name, useId } = req.body;
    let aray = JSON.parse(fs.readFileSync(process.cwd() + "/users.json"));
    let find = aray.filter((e) => e.userId == useId);
    if (find.length == 0) {
      let objec = {
        userId: useId || null,
        first_name: first_name || null,
        userName: `https://t.me/${username}` || null,
      };
      aray.push(objec);
      fs.writeFileSync(
        process.cwd() + "/users.json",
        JSON.stringify(aray, null, 2),
        "utf8"
      );
      if (vidLink && useId) {
        if (vidLink.includes("youtube.com") || vidLink.includes("youtu.be")) {
          const videoId = ytdl.getURLVideoID(vidLink);
          const downloadLink = `https://www.youtube.com/watch?v=${videoId}`;
  
          const vidInfo = await ytdl.getInfo(vidLink);
  
          let arr = JSON.parse(
            fs.readFileSync(process.cwd() + "/music.json", "utf-8")
          );
          let t = arr.filter((e) => e.videoId == videoId);
          if (t.length == 0) {
            const mp4DownloadPath = `/${useId}.mp4`;
            const mp4DownloadStream = ytdl(downloadLink, {
              filter: (format) => format.container === "mp4",
              quality: "highest",
            });
            const mp4FileStream = fs.createWriteStream(
              process.cwd() + "/server/vid" + mp4DownloadPath
            );
            mp4DownloadStream.pipe(mp4FileStream);
  
            mp4DownloadStream.on("end", async () => {
              const mp3DownloadPath = `/music_${videoId}.mp3`;
              const mp3DownloadStream = ytdl(downloadLink, {
                filter: (format) => format.container === "mp4",
                quality: "highestaudio",
              });
              const mp3FileStream = fs.createWriteStream(
                process.cwd() + "/server/Aud" + mp3DownloadPath
              );
              mp3DownloadStream.pipe(mp3FileStream);
  
              let obj = {
                name: vidInfo.videoDetails.author.name,
  
                title: vidInfo.videoDetails.title,
              };
              setTimeout(async () => {
                if (fs.existsSync(mp3FileStream.path)) {
                  let size = fs.statSync(mp3FileStream.path);
                  if ((size.size / (1024 * 1024)).toFixed(2) < 50) {
                    const videoData =  fs.readFileSync(mp3FileStream.path);
                    const stats = fs.statSync(mp3FileStream.path);
                    const fileSizeInBytes = stats.size;
                    let boz = await bot.sendAudio(
                      "@universal_music_01",
                      videoData,
                      {
                        title: obj.name,
                      }
                    );
                    obj = {
                      videoId: videoId,
                      name: vidInfo.videoDetails.author.name,
                      title: vidInfo.videoDetails.title,
                      message_id: boz.message_id,
                      username: "https://t.me/" + boz.chat.username,
                      musicSize: (fileSizeInBytes / (1024 * 1024)).toFixed(2),
                    };
                    arr.push(obj);
                    fs.writeFileSync(
                      path.join(process.cwd() + "/music.json"),
                      JSON.stringify(arr, null, 2),
                      "utf8"
                    );
                    fs.unlinkSync(mp3FileStream.path);
                    fs.unlinkSync(mp4FileStream.path);
                    res.send(obj);
                  } else {
                    res.send({
                      message:
                        "sorry, you have reached the max limit, we cannot upload music through this video",
                      status: 505,
                    });
                    fs.unlinkSync(mp3FileStream.path);
                    fs.unlinkSync(mp4FileStream.path);
                  }
                } else {
                  res.send({ message: "Not file", status: 404 });
                }
              }, 2000);
            });
          } else {
            res.send(t[0]);
          }
        } else {
          console.log("76");
        }
      } else {
        res.send({
          message: "The information is incomplete",
          status: 404,
          data: null,
        });
      }
    }else{
      if (vidLink && useId) {
        if (vidLink.includes("youtube.com") || vidLink.includes("youtu.be")) {
          const videoId = ytdl.getURLVideoID(vidLink);
          const downloadLink = `https://www.youtube.com/watch?v=${videoId}`;
  
          const vidInfo = await ytdl.getInfo(vidLink);
  
          let arr = JSON.parse(
            fs.readFileSync(process.cwd() + "/music.json", "utf-8")
          );
          let t = arr.filter((e) => e.videoId == videoId);
          if (t.length == 0) {
            const mp4DownloadPath = `/${useId}.mp4`;
            const mp4DownloadStream = ytdl(downloadLink, {
              filter: (format) => format.container === "mp4",
              quality: "highest",
            });
            const mp4FileStream = fs.createWriteStream(
              process.cwd() + "/server/vid" + mp4DownloadPath
            );
            mp4DownloadStream.pipe(mp4FileStream);
  
            mp4DownloadStream.on("end", async () => {
              const mp3DownloadPath = `/music_${videoId}.mp3`;
              const mp3DownloadStream = ytdl(downloadLink, {
                filter: (format) => format.container === "mp4",
                quality: "highestaudio",
              });
              const mp3FileStream = fs.createWriteStream(
                process.cwd() + "/server/Aud" + mp3DownloadPath
              );
              mp3DownloadStream.pipe(mp3FileStream);
  
              let obj = {
                name: vidInfo.videoDetails.author.name,
  
                title: vidInfo.videoDetails.title,
              };
              setTimeout(async () => {
                if (fs.existsSync(mp3FileStream.path)) {
                  let size = fs.statSync(mp3FileStream.path);
                  if ((size.size / (1024 * 1024)).toFixed(2) < 50) {
                    const videoData =  fs.readFileSync(mp3FileStream.path);
                    const stats = fs.statSync(mp3FileStream.path);
                    const fileSizeInBytes = stats.size;
                    let boz = await bot.sendAudio(
                      "@universal_music_01",
                      videoData,
                      {
                        title: obj.name,
                      }
                    );
                    obj = {
                      videoId: videoId,
                      name: vidInfo.videoDetails.author.name,
                      title: vidInfo.videoDetails.title,
                      message_id: boz.message_id,
                      username: "https://t.me/" + boz.chat.username,
                      musicSize: (fileSizeInBytes / (1024 * 1024)).toFixed(2),
                    };
                    arr.push(obj);
                    fs.writeFileSync(
                      path.join(process.cwd() + "/music.json"),
                      JSON.stringify(arr, null, 2),
                      "utf8"
                    );
                    fs.unlinkSync(mp3FileStream.path);
                    fs.unlinkSync(mp4FileStream.path);
                    res.send(obj);
                  } else {
                    res.send({
                      message:
                        "sorry, you have reached the max limit, we cannot upload music through this video",
                      status: 505,
                    });
                    fs.unlinkSync(mp3FileStream.path);
                    fs.unlinkSync(mp4FileStream.path);
                  }
                } else {
                  res.send({ message: "Not file", status: 404 });
                }
              }, 2000);
            });
          } else {
            res.send(t[0]);
          }
        } else {
          console.log("76");
        }
      } else {
        res.send({
          message: "The information is incomplete",
          status: 404,
          data: null,
        });
      }
    }
   
  } catch (error) {
    res.send({ message: error.message, status: 404 });
  }
};
