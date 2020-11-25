/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview XML toolbox embedded into a JavaScript text string.
 */
'use strict';

/** Create a namespace for the application. */
var Ardublockly = Ardublockly || {};

Ardublockly.TOOLBOX_XML =
    '<xml>' +
    '  <sep></sep>' +
    '   <category id="catSenseBox_Sensor" name="senseBox Sensors" colour="120">' +
    '      <block type="sensebox_sensor_temp_hum"></block>' +
    '      <block type="sensebox_sensor_uv_light"></block>' +
    '      <block type="sensebox_sensor_bmx055_accelerometer"></block>' +
    // '      <block type="sensebox_sensor_bmx055_gyroscope"></block>' +
    // '      <block type="sensebox_sensor_bmx055_compass"></block>' +
    '      <block type="sensebox_sensor_sds011"></block>' +
    '      <block type="sensebox_sensor_pressure"></block>' +
    '      <block type="sensebox_sensor_bme680_bsec"></block>' +
    '      <block type="sensebox_sensor_ultrasonic_ranger">' +
    '           <field name="ultrasonic_trigger">1</field>' +
    '           <field name="ultrasonic_echo">2</field>' +
    '      </block>' +
    '      <block type="sensebox_sensor_sound"></block>' +
    '      <block type="sensebox_sensor_truebner_smt50"></block>' +
    '      <block type="sensebox_sensor_watertemperature"></block>' +
    '      <block type="sensebox_foto"></block>' +
    '      <block type="sensebox_button"></block>' +
    '      <block type="sensebox_poti"></block>' +
    '      <block type="sensebox_gps_getValues"></block>' +
    '      <block type="sensebox_windspeed"></block>' +
    '      <block type="sensebox_soundsensor_dfrobot"></block>' +
    '      <block type="sensebox_scd30"></block>' +
    '      </category>' +
    '      <sep></sep>' +
    '      <category id="catSenseBox_Display" name="Display" colour="120">' +
    '      <block type="sensebox_display_beginDisplay"></block>' +
    '      <block type="sensebox_display_show"></block>' +
    '      <block type="sensebox_display_clearDisplay"></block>' +
    '      <block type="sensebox_display_printDisplay">' +
    '         <value name="SIZE">' +
    '       <block type="math_number">' +
    '            <field name="NUM">1</field>' +
    '          </block>' +
    '        </value>' +
    '       <value name="X">' +
    '               <block type="math_number">' +
    '                 <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '        <value name="Y">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '       </value>' +
    '      </block>' +
    '       <block type="sensebox_display_fastPrint"> ' +
    '               <value name="Title1">' +
    '          <block type="text">' +
    '            <field name="TEXT">Title</field>' +
    '          </block>' +
    '        </value>' +
    '      <value name="Dimension1">' +
    '          <block type="text">' +
    '            <field name="TEXT">Unit</field>' +
    '          </block>' +
    '        </value>' +
    '           <value name="Title2">' +
    '          <block type="text">' +
    '            <field name="TEXT">Title</field>' +
    '          </block>' +
    '        </value>' +
    '      <value name="Dimension2">' +
    '          <block type="text">' +
    '            <field name="TEXT">Unit</field>' +
    '          </block>' +
    '        </value>' +
    '           </block > ' +
    '      <block type="sensebox_display_fillCircle">' +
    '       <value name="X">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '      <value name="Y">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '       <value name="Radius">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '      </block>' +
    '      <block type="sensebox_display_drawRectangle">' +
    '       <value name="X">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '      <value name="Y">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '       <value name="height">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '       <value name="width">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '      </block>' +
    '      <block type="sensebox_display_plotDisplay">' +
    '           <value name="Title">' +
    '               <block type="text">' +
    '          </block>' +
    '           </value>' +
    '           <value name="YLabel">' +
    '               <block type="text">' +
    '          </block>' +
    '           </value>' +
    '           <value name="XLabel">' +
    '               <block type="text">' +
    '          </block>' +
    '        </value>' +
    '        <value name="XRange1">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '        <value name="XRange2">' +
    '          <block type="math_number">' +
    '            <field name="NUM">15</field>' +
    '          </block>' +
    '        </value>' +
    '        <value name="YRange1">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '        <value name="YRange2">' +
    '          <block type="math_number">' +
    '            <field name="NUM">50</field>' +
    '          </block>' +
    '        </value>' +
    '        <value name="XTick">' +
    '          <block type="math_number">' +
    '            <field name="NUM">5</field>' +
    '          </block>' +
    '        </value>' +
    '        <value name="YTick">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '        <value name="TimeFrame">' +
    '          <block type="math_number">' +
    '            <field name="NUM">15</field>' +
    '          </block>' +
    '        </value>' +
    '       </block>' +
    '   </category>' +
    '  <sep></sep>' +
    '   <category id="catSenseBox_Led" name="LED" colour="120">' +
    '       <block type="sensebox_led"></block>' +
    '      <block type="sensebox_rgb_led">' +
    '        <value name="RED">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '        <value name="GREEN">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '        <value name="BLUE">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '      </block>' +
    '      <block type="sensebox_ws2818_led_init">' +
    '       <value name="NumPixel">' +
    '          <block type="math_number">' +
    '            <field name="NUM">1</field>' +
    '          </block>' +
    '        </value>' +
    '       <value name="BRIGHTNESS">' +
    '          <block type="math_number">' +
    '            <field name="NUM">50</field>' +
    '          </block>' +
    '        </value>' +
    '           </block>' +
    '      <block type="sensebox_ws2818_led">' +
    '          <value name="POSITION">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '        <value name="RED">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '        <value name="GREEN">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '        <value name="BLUE">' +
    '          <block type="math_number">' +
    '            <field name="NUM">0</field>' +
    '          </block>' +
    '        </value>' +
    '      </block>' +
    '   </category>' +
    '  <sep></sep>' +
    '      <category id="catSenseBoxOutput_Web" name="Web" colour="120">' +
    '      <category id="catSenseBox_Wifi" name="Wifi" colour="120">' +
    '      <block type="sensebox_wifi"></block>' +
    '      <block type="sensebox_startap"></block>' +
    '       </category>' +
    '       <sep></sep>' +
    '      <category id="catSenseBox_osem" name="openSenseMap" colour="120">' +
    '      <block type="sensebox_osem_connection"></block>' +
    '      <block type="sensebox_send_to_osem"></block>' +
    '       </category>' +
    '       <sep></sep>' +
    '      <category id="catSenseBoxOutput_Webserver" name="  webserver" colour="120">' +
    '      <block type="sensebox_initialize_http_server"></block>' +
    '      <block type="sensebox_http_on_client_connect"></block>' +
    '      <block type="sensebox_ip_address"></block>' +
    '      <block type="sensebox_http_method"></block>' +
    '      <block type="sensebox_http_uri"></block>' +
    '      <block type="sensebox_http_protocol_version"></block>' +
    '      <block type="sensebox_http_user_agent"></block>' +
    '      <block type="sensebox_generate_http_succesful_response"></block>' +
    '      <block type="sensebox_generate_http_not_found_response"></block>' +
    '      <block type="sensebox_generate_html_doc"></block>' +
    '      <block type="sensebox_general_html_tag"></block>' +
    '      <block type="sensebox_web_readHTML"></block>' +
    '       </category>' +
    '       <sep></sep>' +
    '       <category id="catSenseBoxOutput_LoRa" name="  LoRa" colour="120">' +
    '       <category id="catSenseBoxOutput_LoRa_activation" name="  Activation" colour="120">' +
    '         <block type="sensebox_lora_initialize_otaa"></block>' +
    '         <block type="sensebox_lora_initialize_abp"></block>' +
    '       </category>' +
    '           <category id="catSenseBoxOutput_LoRa_loramessage" name="    Lora Message" colour="120">' +
    '               <block type="sensebox_lora_message_send"></block>' +
    '               <block type="sensebox_send_lora_sensor_value"></block>' +
    '           </category>' +
    '           <category id="catSenseBoxOutput_LoRa_cayenne" name="    Cayenne LPP" colour="120">' +
    '             <block type="sensebox_lora_cayenne_send"></block>' +
    '             <block type="sensebox_lora_cayenne_temperature"></block>' +
    '             <block type="sensebox_lora_cayenne_humidity"></block>' +
    '             <block type="sensebox_lora_cayenne_pressure"></block>' +
    '             <block type="sensebox_lora_cayenne_luminosity"></block>' +
    '             <block type="sensebox_lora_cayenne_sensor"></block>' +
    '             <block type="sensebox_lora_cayenne_accelerometer"></block>' +
    '             <block type="sensebox_lora_cayenne_gps"></block>' +
    '           </category>' +
    '       </category>' +
    '       <category id="catSenseBoxOutput_Telegram" name="Telegram" colour="120">' +
    '           <block type="sensebox_telegram"></block>' +
    '           <block type="sensebox_telegram_do"></block>' +
    '           <block type="sensebox_telegram_do_on_message"></block>' +
    '           <block type="sensebox_telegram_send"></block>' +
    '      </category>' +
    '       </category>' +
    '  <sep></sep>' +
    '      <category id="catSenseBoxOutput_SD" name="   SD" colour="120">' +
    '      <block type="sensebox_sd_create_file"></block>' +
    '      <block type="sensebox_sd_open_file"></block>' +
    '      <block type="sensebox_sd_write_file"></block>' +
    '      </category>' +
    '    <sep></sep>' +
    '   <category id="catLogic" name="Logic" colour="210">' +
    '    <block type="controls_if"></block>' +
    '    <block type="logic_compare"></block>' +
    '    <block type="logic_operation"></block>' +
    '    <block type="logic_negate"></block>' +
    '    <block type="logic_boolean"></block>' +
    '    <block type="logic_null"></block>' +
    '    <block type="logic_ternary"></block>' +
    '    <block type="switch_case"></block>' +
    '   </category>' +
    '   <sep></sep>' +
    '    <category id="catLoops" name="Loops" colour="10">' +
    '           <block type="controls_repeat_ext">' +
    '               <value name="TIMES">' +
    '           <block type="math_number">' +
    '               <field name="NUM">10</field>' +
    '           </block>' +
    '               </value>' +
    '    </block>' +
    '    <block type="controls_whileUntil"></block>' +
    '    <block type="controls_for">' +
    '      <value name="FROM">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1</field>' +
    '        </block>' +
    '      </value>' +
    '      <value name="TO">' +
    '        <block type="math_number">' +
    '          <field name="NUM">10</field>' +
    '        </block>' +
    '      </value>' +
    '      <value name="BY">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="controls_flow_statements"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catMath" name="Math" colour="230">' +
    '    <block type="math_number"></block>' +
    '    <block type="math_arithmetic"></block>' +
    '    <block type="math_single"></block>' +
    '    <block type="math_trig"></block>' +
    '    <block type="math_constant"></block>' +
    '    <block type="math_number_property"></block>' +
    '    <block type="math_change">' +
    '      <value name="DELTA">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="math_round"></block>' +
    '    <block type="math_modulo"></block>' +
    '    <block type="math_constrain">' +
    '      <value name="LOW">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1</field>' +
    '        </block>' +
    '      </value>' +
    '      <value name="HIGH">' +
    '        <block type="math_number">' +
    '          <field name="NUM">100</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="math_random_int">' +
    '      <value name="FROM">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1</field>' +
    '        </block>' +
    '      </value>' +
    '      <value name="TO">' +
    '        <block type="math_number">' +
    '          <field name="NUM">100</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="math_random_float"></block>' +
    '    <block type="base_map"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catText" name="Text" colour="160">' +
    '    <block type="text"></block>' +
    '    <block type="text_join"></block>' +
    '    <block type="text_append">' +
    '      <value name="TEXT">' +
    '        <block type="text"></block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="text_length"></block>' +
    '    <block type="text_isEmpty"></block>' +
    //'    <!--block type="text_trim"></block Need to update block -->' +
    //'    <!--block type="text_print"></block Part of the serial comms -->' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catVariables" name="Variables" colour="330">' +
    '    <block type="variables_get"></block>' +
    '    <block type="variables_set"></block>' +
    '    <block type="variables_set">' +
    '      <value name="VALUE">' +
    '        <block type="variables_set_type"></block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="variables_set_type"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catTime" name="Time" colour="140">' +
    '    <block type="time_delay">' +
    '      <value name="DELAY_TIME_MILI">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1000</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="time_delaymicros">' +
    '      <value name="DELAY_TIME_MICRO">' +
    '        <block type="math_number">' +
    '          <field name="NUM">100</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="time_millis"></block>' +
    '    <block type="time_micros"></block>' +
    '    <block type="infinite_loop"></block>' +
    '    <block type="sensebox_interval_timer"></block>' +
    '  </category>' +
    '  <category id="catAudio" name="Audio" colour="250">' +
    '    <block type="io_tone">' +
    '      <value name="FREQUENCY">' +
    '        <shadow type="math_number">' +
    '          <field name="NUM">220</field>' +
    '        </shadow>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_notone"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <sep>gap="32"</sep>' +
    '  <category id="catAdvanced" name="Advanced" colour="230">' +
    '  <category id="catInputOutput" name="Input/Output" colour="250">' +
    '    <block type="io_digitalwrite">' +
    '      <value name="STATE">' +
    '        <block type="io_highlow"></block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_digitalread"></block>' +
    '    <block type="io_analogwrite"></block>' +
    '    <block type="io_analogread"></block>' +
    '    <block type="io_highlow"></block>' +
    '    <block type="io_pulsein">' +
    '      <value name="PULSETYPE">' +
    '        <shadow type="io_highlow"></shadow>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_pulsetimeout">' +
    '      <value name="PULSETYPE">' +
    '        <shadow type="io_highlow"></shadow>' +
    '      </value>' +
    '      <value name="TIMEOUT">' +
    '        <shadow type="math_number">' +
    '          <field name="NUM">100</field>' +
    '        </shadow>' +
    '      </value>' +
    '    </block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catMotors" name="Motors" colour="60">' +
    '    <block type="servo_write">' +
    '      <value name="SERVO_ANGLE">' +
    '        <block type="math_number">' +
    '          <field name="NUM">90</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="servo_read"></block>' +
    '    <block type="stepper_config">' +
    '      <field name="STEPPER_NUMBER_OF_PINS">2</field>' +
    '      <field name="STEPPER_PIN1">1</field>' +
    '      <field name="STEPPER_PIN2">2</field>' +
    '      <value name="STEPPER_STEPS">' +
    '        <block type="math_number">' +
    '          <field name="NUM">100</field>' +
    '        </block>' +
    '      </value>' +
    '      <value name="STEPPER_SPEED">' +
    '        <block type="math_number">' +
    '          <field name="NUM">10</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="stepper_step">' +
    '      <value name="STEPPER_STEPS">' +
    '        <block type="math_number">' +
    '          <field name="NUM">10</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catComms" name="Comms" colour="160">' +
    '    <block type="serial_setup"></block>' +
    '    <block type="serial_print"></block>' +
    '    <block type="text_prompt_ext">' +
    '      <value name="TEXT">' +
    '        <block type="text"></block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="spi_setup"></block>' +
    '    <block type="spi_transfer"></block>' +
    '    <block type="spi_transfer_return"></block>' +
    '  </category>' +
    '  <category id="catFunctions" name="Functions" custom="PROCEDURE" colour="290"></category>' +
    '  </category>' +
    '</xml>';
