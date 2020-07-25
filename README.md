# Basic front-end architecture

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Stages of creating a structure:

* installing an empty Angular project.
1) creating an empty repository (git init);
2) adding starter libraries (+ -): angular material, translation (ngx-translate core + http-loader);
3) creating a new branch (staging);
4) adding custom environments;
5) adding directives to assets: fonts, i18n, images;
6) adding scss file architecture + connection to angular.json;
7) creating a directory (shared): constants, services, interface, modals, pipes, interceptors;
8) creating a directory (shared-components): navbar, pdf-modal-dialog, progress-spinner, review-dialog;
9) creating the directive components: auth, landing; 
10 changing files in the app directory.

TODO:
1) fix CircularDependencies for components
2) fix allowedCommonJsDependencies for tslint

Основные правила работы над проектом:
1) Исспользуем существующую архитектуру для проектов компании
2)По возможности исспользуем компоненты MaterialDesign от Angular (https://material.angular.io/) или существующие решения с других проектов компании или реализовываем свои (для уникального дизайна)
3) Стараемся дробить большой компонент на независимые блоки для переиспользования их в других проектах
4) Исспользуем техники написания надежного и правильно оформленного кода, ниже основные из них...
5) шрифты, картинки, переводы храним в директории assets/

Правила работы с html и cscc:
1) https://habr.com/ru/post/143452/
2) https://habr.com/ru/company/alconost/blog/419095/

Правила для работы с Angular:
1) https://habr.com/ru/company/ruvds/blog/425661/
2) https://habr.com/ru/company/ruvds/blog/425663/


ДЛЯ ВЕРСТАЛЬЩИКА:

Создание новых компонентов:
1) создание директории с названием секции, например:
A) для ПЕРЕИСПОЛЬЗУЕМЫХ компонентов - src/shared-components/navbar;
B)для НЕпереиспользованных компонентов - src/components/landing.
2) внутри директории создаем 3 файла:
landing.component.html,
landing.component.scss,
landing.component.ts
import {Component} from '@angular/core';
@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  constructor() { }

}
3) *при необходимости дробим текущую секцию на более мелкие компоненты для возможности их переиспользования как в текущем или в будущих проектах
4) регистрируем созданный компонент в src/app/app.module.ts. 
А) Если компонент будет частью LandingPage (главная страница), тогда регистрируем его (LandingComponent) в массиве LANDING_MODULES.
Б) Если компонент будет повторно НЕпереиспользованный, тогда регистрируем его (AppComponent) в массиве MAIN_COMPONENTS.
В) Если компонент будет повторно переиспользованный, тогда регистрируем его (NavbarComponent) в массиве SHARED_COMPONENTS.

Добавление марштура к выбранному компоненту:
*Если для компонента нужен отдельный маршрут, например как тут для страницы блога (https://github.com/BLOG), то делаем следующее...
1) Добавим название маршрута в интерфейс src/shared/interfaces/routing-names.interface.ts (например: home: string,).
2) Добавим название маршрута в константу src/shared/constants/routing-names.const.ts (например: home: '',)
5) Добавляем в файл src/app-routing.module.ts следующее значение, где путь бедем из ROUTING_NAMES и к нему указываем название компонента:
{
  path: ROUTING_NAMES.home,
  component: LandingComponent,
},
6) Добавление компонента в нутри другого - например так <first-section></first-section>. first-section - это название компонента first-section.component.ts -> (selector: 'first-section').

Добавление новых переводов:
1) Основной язык текста  - английский, и работает по след. принципу: <p>{{'Menu' | translate}}</p>
2) Добавляем перевод в каждый языковой файл, например в assest/i18n/ru.json - {"Menu": "Меню"} и в assest/i18n/en.json - {"Menu": "Menu"}

Готовые компоненты для исспользования (src/shared-components):
navbar - шапка для сайта
pdf-modal-dialog - для отображения PDF
progress-spinner - для отображение выполнения действия
review-dialog - форма для отправки фидбека от пользователя


ПРОДВИНУТЫЙ УРОВЕНЬ:

Работа с сервером:
1) создание модели данных, которые поступаю с сервера (shared/models/):
а) наследование от ActiveRecord
б) в provider указываем сервис, через который идет запрос
в) указываем public поля
г) указываем поля так же в protected fields()
2) создание сервиса для выполнение запроса (shared/services/components/):
а) указание protected namespace и protected namespaceSingular для определение роута запроса к бэкенду
б) указание protected ModelClass для указание модели

Основные сервисы:
InitialRequestsService - для первоначальных запросов к БД для получения статических данных
LanguageService - для работы с языковыми функциями
LocalStorageService - для записи в LocalStorage
LogNotificationService - для вывода пользователю уведомлений о успехе, ошибке или предупреждения
ServerValidationFormService - для валидации форм на стороне сервера
CrudService - CRUD команды для отправки на сервер
ApiService - сервис для отправки сырых запросов на сервер

Доп. правила:
1) Создаем константы в (shared/constants) и добавляем к ним интерфейс в (shared/interfaces)
2) для корректировок запросов к серверу (добавление токена, заголовков) - исспользуем (shared/interceptor)
3) для повторяющихся изменений в шаблоне html можно исспользовать (shared/pipes) - например, как для переводов <p>{{'Menu' | translate}}</p>
4) общую логику scss выносим в app/scss
