import User from '../model/user'

const userConroller = {
    read: async (ctx) => {
        ctx.body = await User.find();
    },
    readById: async (ctx) => {
        const user = await User.findById(ctx.params.id);
        ctx.status = 200;
        ctx.body = user;
    },
    create: async (ctx) => {
      const user = new User(ctx.request.body);
      await user.save();
      ctx.status = 201;
      ctx.body = user;
    },
    update: async (ctx) => {
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        ctx.body = user;
        ctx.status = 200;
       
    },
    delete: async (ctx) => {
      const user = await User.findByIdAndDelete(ctx.params.id);
      ctx.status = 200;
      ctx.body = user;
    }
}

export default userConroller;