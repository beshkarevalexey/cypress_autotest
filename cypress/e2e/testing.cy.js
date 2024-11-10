import * as data from "../helpers/default_data.json"

describe('Автотесты: авторизация, смена пароля, форма', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
          });


    it('Авторизация, верные вводные данные', function () {
        cy.get('[type="submit"]').click();
        cy.get(data.pole_mail).type(data.login);
        cy.get(data.pole_pass).type(data.password);
        cy.get(data.knopka_vhod).click();
        cy.get(data.text_end).contains(data.text_uspeh);
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('Авторизация, верный логин, НЕверный пароль', function () {
        cy.get('[type="submit"]').click();
        cy.get(data.pole_mail).type(data.login);
        cy.get(data.pole_pass).type('iLoveqastudio7');
        cy.get(data.knopka_vhod).click();
        cy.get(data.text_end).contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');    
    })

    it('Авторизация, НЕверный логин, верный пароль', function () {
        cy.get('[type="submit"]').click();
        cy.get(data.pole_mail).type(data.nologin);
        cy.get(data.pole_pass).type(data.password);
        cy.get(data.knopka_vhod).click();
        cy.get(data.text_end).contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');    
    })

    it('Авторизация, невалидный логин', function () {
        cy.get('[type="submit"]').click();
        cy.get(data.pole_mail).type('alekseimail.ru');
        cy.get(data.pole_pass).type(data.password);
        cy.get(data.knopka_vhod).click();
        cy.get(data.text_end).contains('Нужно исправить проблему валидации');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');  
    })

    it('Восстановление пароля', function () {
        cy.get('[type="submit"]').click();
        cy.get('#forgotEmailButton').click();
        cy.get('#mailForgot').type(data.login);
        cy.get('#restoreEmailButton').click();
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');   
    })
    
    it('Закрытие формы и ее открытие', function () {
        cy.get('.cancel').click();
        cy.get('.open-button').click();
        cy.get('[type="submit"]').should('be.visible');
    })


})