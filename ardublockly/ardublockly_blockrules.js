
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview XML toolbox embedded into a JavaScript text string.
 */
'use strict';

/** Create a namespace for the application. */
var Ardublockly = Ardublockly || {};

Ardublockly.BLOCKRULES = {
    "blocksInWorkspace": [
        { "name": "sensebox_gps_getValues", "blockToDisable": ["time_delay", "time_delaymicros"] },
        { "name": "sensebox_telegram", "blockToDisable": ["sensebox_telegram"] },
        { "name": "sensebox_wifi", "blockToDisable": ["sensebox_wifi", "sensebox_wifi", "sensebox_startap"] },
        { "name": "sensebox_lora_initialize_otaa", "blockToDisable": ["sensebox_lora_initialize_otaa", "sensebox_lora_initialize_abp"] },
        { "name": "sensebox_lora_initialize_abp", "blockToDisable": ["sensebox_lora_initialize_otaa", "sensebox_lora_initialize_abp"] },
        { "name": "sensebox_interval_timer", "blockToDisable": ["sensebox_interval_timer"] }
    ]
};