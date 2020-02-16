export const eventBot = async (cuid, euid) => {
  try {
    const response = await fetch(" https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.event", {
      method: "POST",
      body: JSON.stringify({
        "cuid": cuid,
        "euid": euid
      })
    });
    let result = await response.json();
    return {
      author: 'messageBot',
      text: result.result.text.value
    };
  } catch (e) {
    return {
      author: 'messageBot',
      text: 'Ошибка инициализации'
    };
  }
};

export const initBot = async (uuid) => {
  try {
    const response = await fetch("https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.init", {
      method: "POST",
      body: JSON.stringify({
        'uuid': uuid,
      })
    });
    let result = await response.json();
    return result.result.cuid
  } catch (e) {
    return 'error uuid undefind';
  }
};

export const requestBot = async (cuid, text) => {
  try {
    const response = await fetch("https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.request", {
      method: "POST",
      body: JSON.stringify({
        'cuid': cuid,
        'text': text
      })
    });
    let result = await response.json();
    return result.result.text.value;
  } catch (e) {
    return 'Ошибка на сервере. Попробуйте еще раз'
  }
};