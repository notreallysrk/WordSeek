import { createReadStream } from "node:fs";
import { Composer, type Context, InlineKeyboard, InputFile } from "grammy";
import {
  DISCUSSION_GROUP,
  DONATION_LINK,
  UPDATES_CHANNEL,
} from "../config/constants";
import { HELP_ACTIONS } from "../util/button-actions";
import { CommandsHelper } from "../util/commands-helper";

const composer = new Composer();

export function getStartKeyboard(ctx: Context) {
  return new InlineKeyboard()
    .url(
      "Aᴅᴅ Mᴇ Tᴏ Yᴏᴜʀ Gʀᴏᴜᴘ",
      `https://t.me/${ctx.me.username}?startgroup=true`,
    )
    .row()
    .url("Uᴘᴅᴀᴛᴇs", UPDATES_CHANNEL)
    .text("Hᴇʟᴘ", HELP_ACTIONS.HOWTO)
    .url("Dɪsᴄᴜssɪᴏɴ", DISCUSSION_GROUP)
    .row()
    .url("💓 Dᴏɴᴀᴛᴇ", DONATION_LINK)
    .success();
}

export function getStartMessage() {
  return `<b>Wᴇʟᴄᴏᴍᴇ Tᴏ WᴏʀᴅSᴇᴇᴋ!</b>

A Fᴜɴ Aɴᴅ Cᴏᴍᴘᴇᴛɪᴛɪᴠᴇ Wᴏʀᴅʟᴇ-Sᴛʏʟᴇ Gᴀᴍᴇ Tʜᴀᴛ Yᴏᴜ Cᴀɴ Pʟᴀʏ Dɪʀᴇᴄᴛʟʏ Oɴ Tᴇʟᴇɢʀᴀᴍ.

<blockquote><b>Qᴜɪᴄᴋ Sᴛᴀʀᴛ:</b>
• Uꜱᴇ /New Tᴏ Sᴛᴀʀᴛ A Nᴇᴡ Gᴀᴍᴇ
• Aᴅᴅ Mᴇ Tᴏ A Gʀᴏᴜᴘ Wɪᴛʜ Aᴅᴍɪɴ Pᴇʀᴍɪꜱꜱɪᴏɴꜱ Tᴏ Pʟᴀʏ Wɪᴛʜ Fʀɪᴇɴᴅꜱ
• Uꜱᴇ /Help Fᴏʀ Dᴇᴛᴀɪʟᴇᴅ Iɴꜱᴛʀᴜᴄᴛɪᴏɴꜱ Aɴᴅ Cᴏᴍᴍᴀɴᴅ Lɪꜱᴛ</blockquote>

Rᴇᴀᴅʏ Tᴏ Tᴇꜱᴛ Yᴏᴜʀ Wᴏʀᴅ Sᴋɪʟʟꜱ? Lᴇᴛ'ꜱ Pʟᴀʏ!`;
}

composer.command("start", async (ctx) => {
  const keyboard = getStartKeyboard(ctx);
  const caption = getStartMessage();

  try {
    await ctx.replyWithPhoto(
      new InputFile(createReadStream("./src/data/banner.png")),
      {
        caption,
        parse_mode: "HTML",
        reply_markup: keyboard,
      },
    );
  } catch {
    await ctx.reply(caption, {
      parse_mode: "HTML",
      reply_markup: keyboard,
    });
  }
});

CommandsHelper.addNewCommand("start", "Start the bot");

export const startCommand = composer;
