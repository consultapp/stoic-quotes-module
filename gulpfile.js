// COMMON
import gulp from "gulp";
const { src, dest, watch, series } = gulp;

import { deleteAsync } from "del";
import syncServer from "browser-sync";
const sync = syncServer.create();

import ts from "gulp-typescript";

import flatten from "gulp-flatten";
import gulp_minify from "gulp-minify";

import minify_js from "gulp-minifier";

// // STYLE

import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

import autoprefixer from "gulp-autoprefixer";
import minify from "gulp-clean-css";
import sourcemaps from "gulp-sourcemaps";
import concat from "gulp-concat";

// // HTML
// import include from "gulp-file-include";

// // IMAGES
// import imagemin from "gulp-imagemin";

const PACK_NAME = "stoic";

function scss() {
  return src("src/**/**.scss") // берем все файлы с расширением .scss
    .pipe(sourcemaps.init()) // начинаем собирать sourcemap информацию
    .pipe(sass().on("error", sass.logError)) // препроцессор sass
    .pipe(autoprefixer()) // добавляем браузерные префиксы
    .pipe(concat(`${PACK_NAME}.css`)) // собираем все в 1 файл
    .pipe(minify()) // минифицируем
    .pipe(sourcemaps.write(".")) // указываем sourcemap  туже директорию
    .pipe(dest("./dist/css")); // сохраняем конечный фалй
}

function js() {
  var tsProject = ts.createProject("tsconfig.json");
  return (
    src("src/**/**.ts") // выбираем файлы по маске
      .pipe(tsProject())
      .pipe(concat(`${PACK_NAME}.js`)) // сиединяем в один файл script.js
      // .pipe(
      //   minify_js({
      //     minify: true,
      //     // minifyJS: {
      //     //   sourceMap: true,
      //     // },
      //   })
      // )
      .pipe(dest("./dist/js"))
  );
}

function clear() {
  return deleteAsync("dist"); // удаляем все файлы из итогового проекта
}

function serve() {
  // инициализируем сервер, который хостит нашу папку итогового проекта
  sync.init({ server: "./dist" });
  // следим за файлами по маске и запускаем функции при их изменении
  // далее перезагружаем сервер
  // watch(["src/**/**.html"], series(html)).on("change", sync.reload);
  watch(["src/**/**.scss"], series(scss)).on("change", sync.reload);
  // watch(["src/assets/images/*"], series(images)).on("change", sync.reload);
  // watch("src/**/**.js", series(js)).on("change", sync.reload);
}

const build = series([clear, scss, js]);
const dev = series([clear, scss, serve]);
// const build = series([clear, scss, html, js, images]);
// const dev = series([clear, scss, html, js, images, serve]);

export { build, dev };
