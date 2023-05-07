import { unlink, appendFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

export async function removeFile(path) {
  try {
    await unlink(path)
  } catch (error) {
    console.log('Error while removing file', error.message)
  }
}

export async function writeUserInputToFile(ctx, message, botAnswer) {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const filePath = join(__dirname, 'user_messages.txt')
  const user = ctx.from
  const messageDate = new Date(ctx.message.date * 1000)
  const userNickname = user.username || `${user.first_name} ${user.last_name}`

  const textToWrite = `---------------------------------------\nNickname: ${userNickname}\nMessage: ${message}\nBotAnswer: ${botAnswer}\nDate: ${messageDate}\n\n`

  try {
    await appendFile(filePath, textToWrite)
    console.log('Текст успішно записано до файлу.')
  } catch (err) {
    console.error('Помилка при записі тексту до файлу:', err.message)
  }
}
