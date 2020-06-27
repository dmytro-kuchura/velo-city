<?php

namespace App\Models\Enum;

class ProductConstants extends Common
{
    const STATUS_ACTIVE = 1;
    const STATUS_DISABLE = 0;
    const IS_TOP = 1;
    const IS_NOT_TOP = 0;
    const IS_NEW = 1;
    const IS_NOT_NEW = 0;
    const IS_SALE = 1;
    const IS_NOT_SALE = 0;
    const IS_AVAILABLE = 1;
    const NOT_AVAILABLE = 0;

    const CYCLING_CATEGORIES = [
        1205, 1206, 1207, 1208, 1214, 1215, 1217, 1218, 1219, 1220,
    ];

    const EQUIPMENT_CATEGORIES = [
        1295, 1296, 1297, 1299, 1300, 1301, 1303, 1305, 1306,
    ];

    const COMPONENTS_CATEGORIES = [
        1264, 1265, 1266, 1267, 1268, 1269, 1281, 1255, 1256, 1257,
        1258, 1259, 1260, 1261, 1262,
    ];
}
