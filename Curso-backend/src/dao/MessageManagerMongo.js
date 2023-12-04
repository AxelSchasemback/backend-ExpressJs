import { message } from './model/message.js'


class MessagesManager {

    async create(datosUser) {
        const messages = await message.create(datosUser)
        return messages.toObject()
    }
    async insertMessage(user){
        const dataUser = await message.insertMany(user)
        return dataUser
    }

    async getMessage() {
        return await message.find().lean()
    }
}



export const messagesManager = new MessagesManager()