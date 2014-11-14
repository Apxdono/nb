define(['app'], function (app) {
    app.config(function (xtFormErrorsProvider) {
        xtFormErrorsProvider.setErrors({
            minlength: 'Длинна должна быть не меньше {{minlength}}',
            maxlength: 'Длинна должна быть не больше {{maxlength}}',
            required: 'Укажите значение',
            number: 'Значение должно быть числом',
            min: 'Значение должно быть не меньше {{min}}',
            max: 'Значение должно быть не больше {{max}}',
            email: 'Неверный email',
            pattern: 'Неверное значение'
        });
    });
});