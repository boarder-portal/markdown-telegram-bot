const Application = require('koa');
const bodyParser = require('koa-bodyparser');
const axios = require('axios');

const botId = '501652518:AAEc87AeHzXqfHbapjJXzEBNf2B1M4B11ow';

const app = new Application();

const mdPicture = 'https://yzhang.gallerycdn.vsassets.io/extensions/yzhang/markdown-all-in-one/0.11.2/1511448178283/Microsoft.VisualStudio.Services.Icons.Default';
const htmlPicture = 'http://codesfiction.com/wp-content/uploads/2017/08/html-xxl.png';

app
  .use(bodyParser())
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      console.log(err);
    } finally {
      ctx.body = '';
    }
  })
  .use(async (ctx, next) => {
    if (ctx.url !== '/new-message' || ctx.method !== 'POST') {
      return next();
    }

    console.log(ctx.request.body);

    if (!ctx.request.body.inline_query) {
      return next();
    }

    const {
      inline_query: {
        id: queryId,
        query
      }
    } = ctx.request.body;

    await axios.post(`https://api.telegram.org/bot${botId}/answerInlineQuery`, {
      inline_query_id: queryId,
      next_offset: '',
      results: []
    });
  })
  .listen(process.env.PORT, () => {
    console.log(`Telegram app listening on port ${process.env.PORT}!`);
  });
