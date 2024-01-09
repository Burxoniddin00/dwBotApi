import bot  from "../schemas/bot.schema.js";

class Bot {
  async select(id, filter, option) {
    try {
      if (id) return await bot.findById(id, option);
      return await bot.find(filter, option);
    } catch (error) {
      return error.message;
    }
  }

  async insert(body) {
    try {
      return await bot.create(body);
    } catch (error) {
      return error.message;
    }
  }

  
}

export default new Bot();
