# Stoic Quotes Page Module

Модуль позволяет добавить на страницу всплывающие цитаты Cтоиков.
https://stoicquotes.ru/

<p align="center">
 <img width="auto" src="screen1.png" alt="qr" style="border:1px dotted black; border-radius:10px;"/>
</p>

## Подключение модуля

### Параметры класса

```
interface Params {
  root?: HTMLDivElement;
  width?: string;
  positionX?: "left" | "right" | "center";
  positionY?: "top" | "bottom" | "center";
  margin?: string;
  baseClassName?: string;
  delay?: string;
  serverApi: string;
}

// Настройки по умолчанию
const initialParams: Params = {
  positionX: "center",
  positionY: "center",
  baseClassName: "stoic",
  delay: "30",
  serverApi: "https://stoicquotes.ru/random",
};

```

### Методы класса 'Stoic'

```
nextQuote();
show();
hide();
play();
stop();
```

### Пример подключения

```
<!doctype html>
<html lang="en">
  <head>
    ...
    <link rel="stylesheet" href="/dist/css/stoic.css" />
    <script src="/dist/js/Stoic.class.js"></script>
  </head>
  <body>
    <script>
      window.addEventListener('load', () => {
        const stoic = new Stoic();
        const root = document.querySelector('.stoic');
        root.addEventListener('click', () => {
          stoic.nextQuote();
        });
      });
    </script>
    ...
  </body>
</html>
```

### Вопросы

info@consultapp.ru
