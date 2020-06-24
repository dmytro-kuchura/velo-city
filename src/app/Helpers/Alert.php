<?php namespace App\Helpers;

use App\Exceptions\WrongParametersException;

/**
 * Class Alert
 * Создаем блок вверху страницы с сообщением для пользователя
 * @package App\Helpers
 */
class Alert
{
    /**
     * Приемлемые типы сообщений
     * @var array
     */
    static $types = ['info', 'success', 'danger', 'warning'];

    /**
     * Ключ для хранения в сессии
     * @var string
     */
    static $sessionKey = 'alert';

    /**
     * Alert constructor.
     * Собственно, сохраняем данные о сообщении в сессию (только для запроса на следующей странице)
     * @param $text
     * @param string $type
     * @param null $title
     * @param null $icon
     * @throws WrongParametersException
     */
    public function __construct($text, $type = 'info', $title = null, $icon = null)
    {
        if (in_array($type, static::$types) === false) {
            throw new WrongParametersException('Wrong alert type!');
        }

        if (!$text) {
            throw new WrongParametersException('Text can not be empty!');
        }

        request()->session()->flash(static::$sessionKey, [
            'type' => $type,
            'title' => $title,
            'text' => $text,
            'icon' => $icon,
        ]);
    }

    /**
     * Создаем сообщение статически
     *
     * @param $text
     * @param string $type
     * @param null $title
     * @param null $icon
     * @return Alert
     * @throws WrongParametersException
     */
    public static function create($text, $type = 'info', $title = null, $icon = null)
    {
        return new Alert(trim($text), $type, trim($title) ?: null, trim($icon) ?: null);
    }

    /**
     * Хелпер для ошибки
     *
     * @param $text
     * @param null $title
     * @return Alert
     * @throws WrongParametersException
     */
    public static function danger($text, $title = null)
    {
        return new Alert(trim($text), 'danger', trim($title) ?: null, 'error');
    }

    /**
     * Хелпер для успешного сообщения
     *
     * @param $text
     * @param null $title
     * @return Alert
     * @throws WrongParametersException
     */
    public static function success($text, $title = null)
    {
        return new Alert(trim($text), 'success', trim($title) ?: null, 'success');
    }

    /**
     * Хелпер для информационного сообщения
     *
     * @param $text
     * @param null $title
     * @return Alert
     * @throws WrongParametersException
     */
    public static function info($text, $title = null)
    {
        return new Alert(trim($text), 'info', trim($title) ?: null, 'info');
    }

    /**
     * Хелпер для предупреждения
     *
     * @param $text
     * @param null $title
     * @return Alert
     * @throws WrongParametersException
     */
    public static function warning($text, $title = null)
    {
        return new Alert(trim($text), 'warning', trim($title) ?: null, 'warning');
    }

    /**
     * Хелпер для сообщения после создания данных
     *
     * @param bool $success
     * @return Alert
     * @throws WrongParametersException
     */
    public static function afterCreating($success = true)
    {
        if ($success === true) {
            return static::success('Запись успешно создана');
        }
        return static::danger('Запись не была создана. Пожалуйста, повторите попытку');
    }

    /**
     * Хелпер для сообщения после обновления данных
     * @param bool $success
     * @return Alert
     */
    public static function afterUpdating($success = true)
    {
        if ($success === true) {
            return static::success('Запись успешно обновлена');
        }
        return static::danger('Запись не была обновлена. Пожалуйста, повторите попытку');
    }

    /**
     * Хелпер для сообщения после удаления данных
     * @param bool $success
     * @return Alert
     */
    public static function afterDeleting($success = true)
    {
        if ($success === true) {
            return static::success('Запись была успешно удалена');
        }
        return static::danger('Запись не была удалена. Пожалуйста, повторите попытку');
    }

    /**
     * Хелпер для сообщения после восстановления данных
     * @param bool $success
     * @return Alert
     */
    public static function afterRestoring($success = true)
    {
        if ($success === true) {
            return static::success('Запись была успешно восстановлена');
        }
        return static::danger('Запись не была восстановлена. Пожалуйста, повторите попытку');
    }

    /**
     * Хелпер для сообщения после удаления изображения
     * @param bool $success
     * @return Alert
     */
    public static function afterImageDeleting($success = true)
    {
        if ($success === true) {
            return static::success('Изображение было успешно удалено');
        }
        return static::danger('Изображение не было удалено. Пожалуйста, повторите попытку');
    }

    /**
     * Достаем сообщение из сессии
     * @return array|null
     */
    public static function get()
    {
        return session(static::$sessionKey);
    }

    /**
     * Прочли и забыли
     */
    public static function forget(): void
    {
        session()->forget(static::$sessionKey);
    }

}
