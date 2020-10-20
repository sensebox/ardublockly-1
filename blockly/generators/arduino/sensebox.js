/*
@metadata
    author": Felix Erdmann u. Mario Pesch (senseBox)
    lastupdated": 2020/03/05
    for more information: www.sensebox.de
*/

'use strict';

goog.provide('Blockly.Arduino.sensebox');

goog.require('Blockly.Arduino');


/*
----------------------------------Sensoren--------------------------------------------------
*/
Blockly.Arduino.sensebox_sensor_pressure = function () {
  var dropdown_name = this.getFieldValue('NAME');
  var referencePressure = this.getFieldValue('referencePressure');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.definitions_['define_pressure'] = 'BMP280 bmp_sensor;';
  Blockly.Arduino.setups_['sensebox_bmp_sensor'] = 'bmp_sensor.begin();';
  if (dropdown_name == 'Pressure' || dropdown_name == 'Temperature') {
    var code = 'bmp_sensor.get' + dropdown_name + '()';
  }
  else if (dropdown_name == 'Altitude') {
    var code = 'bmp_sensor.getAltitude(' + referencePressure + ')';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_bme680_bsec = function () {
  var dropdown_name = this.getFieldValue('dropdown');
  Blockly.Arduino.includes_['library_bsec'] = '#include "bsec.h"';
  Blockly.Arduino.definitions_['bsec_iaqSensor'] = 'Bsec iaqSensor;'
  Blockly.Arduino.variables_['bmeTemperatur'] = 'float bmeTemperatur;';
  Blockly.Arduino.variables_['bmeHumidity'] = 'float bmeHumidity;';
  Blockly.Arduino.variables_['bmePressure'] = 'double bmePressure;';
  Blockly.Arduino.variables_['bmeIAQ'] = 'float bmeIAQ;';
  Blockly.Arduino.variables_['bmeIAQAccuracy'] = 'float bmeIAQAccuracy;';
  Blockly.Arduino.variables_['bmeCO2'] = 'int bmeCO2;';
  Blockly.Arduino.variables_['bmeBreathVocEquivalent'] = 'float bmeBreathVocEquivalent;'

  Blockly.Arduino.codeFunctions_['checkIaqSensorStatus'] = `
  void checkIaqSensorStatus(void)
{
  if (iaqSensor.status != BSEC_OK) {
    if (iaqSensor.status < BSEC_OK) {
      for (;;)
        errLeds(); /* Halt in case of failure */
    } 
  }

  if (iaqSensor.bme680Status != BME680_OK) {
    if (iaqSensor.bme680Status < BME680_OK) {
      for (;;)
        errLeds(); /* Halt in case of failure */
    } 
  }
}
`;
  Blockly.Arduino.codeFunctions_['errLeds'] = `
void errLeds(void)
{
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);
  delay(100);
  digitalWrite(LED_BUILTIN, LOW);
  delay(100);
}`;
  //Setup Code
  Blockly.Arduino.setups_['Wire.begin'] = 'Wire.begin();';
  Blockly.Arduino.setups_['iaqSensor.begin'] = 'iaqSensor.begin(BME680_I2C_ADDR_PRIMARY, Wire);';
  Blockly.Arduino.setups_['checkIaqSensorStatus'] = 'checkIaqSensorStatus();';
  Blockly.Arduino.setups_['bsec_sensorlist'] = `
  bsec_virtual_sensor_t sensorList[10] = {
    BSEC_OUTPUT_RAW_TEMPERATURE,
    BSEC_OUTPUT_RAW_PRESSURE,
    BSEC_OUTPUT_RAW_HUMIDITY,
    BSEC_OUTPUT_RAW_GAS,
    BSEC_OUTPUT_IAQ,
    BSEC_OUTPUT_STATIC_IAQ,
    BSEC_OUTPUT_CO2_EQUIVALENT,
    BSEC_OUTPUT_BREATH_VOC_EQUIVALENT,
    BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_TEMPERATURE,
    BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_HUMIDITY,
  };
  `;
  Blockly.Arduino.setups_['iaqSensorUpdateSubscription'] = 'iaqSensor.updateSubscription(sensorList, 10, BSEC_SAMPLE_RATE_LP);\ncheckIaqSensorStatus();';
  //Loop Code
  Blockly.Arduino.loops_['iaqloop'] = `
  if (iaqSensor.run()) {
    bmeTemperatur = iaqSensor.temperature;
    bmeHumidity = iaqSensor.humidity;
    bmePressure = iaqSensor.pressure;
    bmeIAQ = iaqSensor.iaq;
    bmeIAQAccuracy = iaqSensor.iaqAccuracy;
    bmeCO2 = iaqSensor.co2Equivalent;
    bmeBreathVocEquivalent = iaqSensor.breathVocEquivalent;
  } else {
    checkIaqSensorStatus();
  }
  `;
  switch (dropdown_name) {
    case 'temperature':
      var code = 'bmeTemperatur';
      break;
    case 'humidity':
      var code = 'bmeHumidity';
      break;
    case 'pressure':
      var code = 'bmePressure'
      break;
    case 'IAQ':
      var code = 'bmeIAQ';
      break;
    case 'IAQAccuracy':
      var code = 'bmeIAQAccuracy';
      break;
    case 'CO2':
      var code = 'bmeCO2';
      break;
    case 'breathVocEquivalent':
      var code = 'bmeBreathVocEquivalent';
      break;
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.sensebox_sensor_bme680 = function () {
  var dropdown_name = this.getFieldValue('NAME');
  var referencePressure = this.getFieldValue('referencePressure');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.includes_['library_AdafruitBME680'] = '#include "Adafruit_BME680.h"';
  Blockly.Arduino.definitions_['define_pressure'] = 'Adafruit_BME680 bme;';
  Blockly.Arduino.setups_['sensebox_bmp_sensor'] = 'bme.begin(0x76);';
  Blockly.Arduino.setups_['bme_temperature_oversampling'] = 'bme.setTemperatureOversampling(BME680_OS_8X);';
  Blockly.Arduino.setups_['bme_humidity_oversampling'] = 'bme.setHumidityOversampling(BME680_OS_2X);';
  Blockly.Arduino.setups_['bme_pressure_oversampling'] = 'bme.setPressureOversampling(BME680_OS_4X);';
  Blockly.Arduino.setups_['bme_setIIR'] = 'bme.setIIRFilterSize(BME680_FILTER_SIZE_3);';
  Blockly.Arduino.loops_['bme_performReading'] = 'bme.performReading();';
  Blockly.Arduino.setups_['bme_gas_heater'] = 'bme.setGasHeater(0,0);';
  var code = 'bme.' + dropdown_name;
  if (dropdown_name == 'gas_resistance' && dropdown_name != 'temperature' && dropdown_name != 'humidity' && dropdown_name != 'pressure') {
    code = 'bme.gas_resistance / 1000.0'
    Blockly.Arduino.setups_['bme_gas_heater'] = 'bme.setGasHeater(320, 150);';
  }
  else if (dropdown_name == 'readAltitude' && dropdown_name != 'temperature' && dropdown_name != 'humidity' && dropdown_name != 'pressure') {
    code = 'bme.readAltitude(' + referencePressure + ')';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_temp_hum = function () {
  var dropdown_name = this.getFieldValue('NAME');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.definitions_['define_hdc'] = 'HDC1080 hdc;';
  Blockly.Arduino.setups_['sensebox_sensor_temp_hum'] = 'hdc.begin();';
  var code = 'hdc.get' + dropdown_name + '()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_uv_light = function () {
  var dropdown_name = this.getFieldValue('NAME');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  if (dropdown_name == 'UvIntensity') {
    Blockly.Arduino.definitions_['define_veml'] = 'VEML6070 veml;'
    Blockly.Arduino.setups_['sensebox_sensor_uv_light'] = 'veml.begin();'
    var code = 'veml.get' + dropdown_name + '()';
  }
  if (dropdown_name == 'Illuminance') {
    Blockly.Arduino.definitions_['define_tsl'] = 'TSL45315 tsl;'
    Blockly.Arduino.setups_['sensebox_sensor_illuminance'] = 'tsl.begin();'
    var code = 'tsl.get' + dropdown_name + '()';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_bmx055_accelerometer = function () {
  var dropdown_value = this.getFieldValue('VALUE');
  var range = this.getFieldValue('RANGE');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.definitions_['define_bmx'] = 'BMX055 bmx;';
  Blockly.Arduino.setups_['sensebox_sensor_bmx055'] = 'bmx.beginAcc(' + range + ');';
  var code = 'bmx.getAcceleration' + dropdown_value + '()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_sds011 = function () {
  var dropdown_name = this.getFieldValue('NAME');
  var serial_name = this.getFieldValue('SERIAL');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.codeFunctions_['define_sds011'] = 'SDS011 my_sds(' + serial_name + ');';
  Blockly.Arduino.variables_['variables_sds011'] = 'float p10,p25;\n';
  Blockly.Arduino.setups_['sensebox_sensor_sds011'] = serial_name + '.begin(9600);';
  var code = 'my_sds.get' + dropdown_name + '()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_ultrasonic_ranger = function () {
  var dropdown_pin_RX = this.getFieldValue('ultrasonic_trigger');
  var dropdown_pin_TX = this.getFieldValue('ultrasonic_echo');
  var port = this.getFieldValue('port');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.definitions_['var_ultrasonic' + port] = 'Ultrasonic Ultrasonic' + port + '(' + dropdown_pin_RX + ',' + dropdown_pin_TX + ');';
  var code;
  code = 'Ultrasonic' + port + '.getDistance()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_sound = function () {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.definitions_['define_microphone'] = 'Microphone microphone(' + dropdown_pin + ');'
  var code = 'microphone.getValue()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.sensebox_sensor_soil = function () {

  var dropdown_port = this.getFieldValue('Port');
  var dropdown_pin = 1;
  if (dropdown_port == 'A') {
    dropdown_pin = 1;
  }
  if (dropdown_port == 'B') {
    dropdown_pin = 3;
  }
  if (dropdown_port == 'C') {
    dropdown_pin = 5;
  }
  var code = 'analogRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_truebner_smt50 = function () {
  var dropdown_port = this.getFieldValue('Port')
  var dropdown_value = this.getFieldValue('value');
  var dropdown_pin = 1;
  if (dropdown_value == 'temp') {
    if (dropdown_port == 'A') {
      dropdown_pin = 1;
    }
    if (dropdown_port == 'B') {
      dropdown_pin = 3;
    }
    if (dropdown_port == 'C') {
      dropdown_pin = 5;
    }
    Blockly.Arduino.userFunctions_['sensebox_smt50_temp'] = 'float getSMT50Temperature(int analogPin){\n  int sensorValue = analogRead(analogPin);\n  float voltage = sensorValue * (3.3 / 1024.0);\n   return (voltage - 0.5) * 100;\n}';
    var code = 'getSMT50Temperature(' + dropdown_pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  }
  else if (dropdown_value == 'soil') {
    if (dropdown_port == 'A') {
      dropdown_pin = 2;
    }
    if (dropdown_port == 'B') {
      dropdown_pin = 4;
    }
    if (dropdown_port == 'C') {
      dropdown_pin = 6;
    }
    Blockly.Arduino.userFunctions_['sensebox_smt50_soil'] = 'float getSMT50Moisture(int analogPin){\n   int sensorValue = analogRead(analogPin);\n    float voltage = sensorValue * (3.3 / 1024.0);\n   return (voltage * 50) / 3;\n}';
    var code = 'getSMT50Moisture(' + dropdown_pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  }

};


Blockly.Arduino.sensebox_sensor_watertemperature = function () {

  var dropdown_port = this.getFieldValue('Port');
  var dropdown_pin = 1;
  if (dropdown_port == 'A') {
    dropdown_pin = 1;
  }
  if (dropdown_port == 'B') {
    dropdown_pin = 3;
  }
  if (dropdown_port == 'C') {
    dropdown_pin = 5;
  }
  Blockly.Arduino.includes_['library_oneWire'] = '#include "OneWire.h"';
  Blockly.Arduino.includes_['library_oneDallasTemperature'] = '#include "DallasTemperature.h"';
  Blockly.Arduino.definitions_['define_OneWire'] = '#define ONE_WIRE_BUS ' + dropdown_pin + '\nOneWire oneWire(ONE_WIRE_BUS);\nDallasTemperature sensors(&oneWire);';
  Blockly.Arduino.setups_['sensebox_oneWireSetup'] = 'sensors.begin();';
  Blockly.Arduino.userFunctions_['sensebox_requestTemp'] = 'float getWaterTemp(){\nsensors.requestTemperatures();\nsensors.getTempCByIndex(0);\n}';
  var code = 'getWaterTemp()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/*
----------------------------------Bees--------------------------------------------------
*/

/* Wifi connection and openSenseMap Blocks*/
Blockly.Arduino.sensebox_wifi = function (block) {
  var pw = this.getFieldValue('Password');
  var ssid = this.getFieldValue('SSID');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.definitions_['define_network'] = 'Bee* b = new Bee();';
  if (pw == "") {
    Blockly.Arduino.setups_['sensebox_network'] = 'b->connectToWifi("' + ssid + '");\ndelay(1000);';
  } else
    Blockly.Arduino.setups_['sensebox_network'] = 'b->connectToWifi("' + ssid + '","' + pw + '");\ndelay(1000);';
  var code = '';
  return code;
};

Blockly.Arduino.sensebox_startap = function (block) {
  var ssid = this.getFieldValue('SSID');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.definitions_['define_network'] = 'Bee* b = new Bee();';
  Blockly.Arduino.setups_['sensebox_network'] = 'b->startAP("' + ssid + '");'
  var code = '';
  return code;
};

Blockly.Arduino.sensebox_osem_connection = function (block) {
  var box_id = this.getFieldValue('BoxID');
  var host = this.getFieldValue('host');
  var access_token = this.getFieldValue('access_token');
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  var blocks = Blockly.Blocks.sensebox.getDescendants;
  var type = this.getFieldValue('type');
  var ssl = this.getFieldValue('SSL');
  var port = 0;
  var count = 0;
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].type === 'sensebox_send_to_osem') {
      count++;

    }
  }
  var num_sensors = count;
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.definitions_['num_sensors'] = 'static const uint8_t NUM_SENSORS = ' + num_sensors + ';'
  Blockly.Arduino.definitions_['SenseBoxID'] = 'const char SENSEBOX_ID [] PROGMEM = "' + box_id + '";';
  Blockly.Arduino.definitions_['host'] = 'const char server [] PROGMEM =' + host + ';';
  if (ssl == 'TRUE') {
    Blockly.Arduino.definitions_['WiFiSSLClient'] = 'WiFiSSLClient client;';
    port = 443;
  } else if (ssl == 'FALSE') {
    Blockly.Arduino.definitions_['WiFiClient'] = 'WiFiClient client;';
    port = 80;
  }

  Blockly.Arduino.definitions_['measurement'] = `typedef struct measurement {
    const char *sensorId;
    float value;
  } measurement;`;
  Blockly.Arduino.definitions_['buffer'] = 'char buffer[750];';
  Blockly.Arduino.definitions_['num_measurement'] = `measurement measurements[NUM_SENSORS];
  uint8_t num_measurements = 0;`;
  Blockly.Arduino.definitions_['lengthMultiplikator'] = 'const int lengthMultiplikator = 35;';
  Blockly.Arduino.codeFunctions_['addMeasurement'] = `
  void addMeasurement(const char *sensorId, float value) {
  measurements[num_measurements].sensorId = sensorId;
  measurements[num_measurements].value = value;
  num_measurements++;
  }`;
  if (type === 'Stationary') {
    Blockly.Arduino.codeFunctions_['writeMeasurementsToClient'] = `
  void writeMeasurementsToClient() {
  // iterate throug the measurements array
  for (uint8_t i = 0; i < num_measurements; i++) {
    sprintf_P(buffer, PSTR("%s,%9.2f\\n"), measurements[i].sensorId,
              measurements[i].value);
    // transmit buffer to client
    client.print(buffer);
  }
  // reset num_measurements
  num_measurements = 0;
}`;
    Blockly.Arduino.userFunctions_['submitValues'] = `
  void submitValues() {
if (client.connected()) {
  client.stop();
  delay(10);
}
bool connected = false;
char _server[strlen_P(server)];
strcpy_P(_server, server);
for (uint8_t timeout = 2; timeout != 0; timeout--) {
  Serial.println(F("connecting..."));
  connected = client.connect(_server, `+ port + `);
  if (connected == true) {
    // construct the HTTP POST request:
    sprintf_P(buffer,
              PSTR("POST /boxes/%s/data HTTP/1.1\\nAuthorization: ${access_token}\\nHost: %s\\nContent-Type: "
                   "text/csv\\nConnection: close\\nContent-Length: %i\\n\\n"),
              SENSEBOX_ID, server, num_measurements * lengthMultiplikator);
    // send the HTTP POST request:
    client.print(buffer);
    // send measurements
    writeMeasurementsToClient();
    // send empty line to end the request
    client.println();
    uint16_t timeout = 0;
    // allow the response to be computed
    while (timeout <= 5000) {
      delay(10);
      timeout = timeout + 10;
      if (client.available()) {
        break;
      }
    }
    num_measurements = 0;
    break;
  }
}
}`;
    var code = '';
    code += branch;
    code += "submitValues();\n";
  }
  else if (type === 'Mobile') {
    var lat = Blockly.Arduino.valueToCode(block, 'lat', Blockly.Arduino.ORDER_ATOMIC);
    var lng = Blockly.Arduino.valueToCode(block, 'lng', Blockly.Arduino.ORDER_ATOMIC);
    var timestamp = Blockly.Arduino.valueToCode(block, 'timeStamp', Blockly.Arduino.ORDER_ATOMIC);
    var altitude = Blockly.Arduino.valueToCode(block, 'altitude', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['lengthMultiplikator'] = 'const int lengthMultiplikator = 77;';
    Blockly.Arduino.codeFunctions_['writeMeasurementsToClient'] = `
    void writeMeasurementsToClient(float lat, float lng, float altitude, char* timeStamp) {
    // iterate throug the measurements array
    for (uint8_t i = 0; i < num_measurements; i++) {
    sprintf_P(buffer, PSTR("%s,%9.2f,%s,%3.6f,%3.6f,%5.2f\\n"), measurements[i].sensorId,
              measurements[i].value, timeStamp, lng, lat, altitude);
    // transmit buffer to client
    client.print(buffer);
    }
    // reset num_measurements
    num_measurements = 0;
    }`;
    Blockly.Arduino.userFunctions_['submitValues'] = `
    void submitValues(float lat, float lng, float altitude, char* timeStamp) {
  if (client.connected()) {
    client.stop();
    delay(10);
  }
  bool connected = false;
  char _server[strlen_P(server)];
  strcpy_P(_server, server);
  for (uint8_t timeout = 2; timeout != 0; timeout--) {
    Serial.println(F("connecting..."));
    connected = client.connect(_server, `+ port + `);
    if (connected == true) {
      // construct the HTTP POST request:
      sprintf_P(buffer,
                PSTR("POST /boxes/%s/data HTTP/1.1\\nAuthorization: ${access_token}\\nHost: %s\\nContent-Type: "
                     "text/csv\\nConnection: close\\nContent-Length: %i\\n\\n"),
                SENSEBOX_ID, server, num_measurements * lengthMultiplikator);
      // send the HTTP POST request:
      client.print(buffer);
      // send measurements
      writeMeasurementsToClient(lat, lng, altitude, timeStamp);
      // send empty line to end the request
      client.println();
      uint16_t timeout = 0;
      // allow the response to be computed
      while (timeout <= 5000) {
        delay(10);
        timeout = timeout + 10;
        if (client.available()) {
          break;
        }
      }
  
      num_measurements = 0;
      break;
    }
  }
}`
    var code = '';
    code += branch;
    code += 'submitValues(' + lat + ',' + lng + ',' + altitude + ',' + timestamp + ');\n';
  }
  return code;
};

/**
* Block send Data to the openSenseMap
*/
Blockly.Arduino.sensebox_send_to_osem = function (block) {
  var code = '';
  var sensor_id = this.getFieldValue('SensorID');
  var id = sensor_id.slice(-3).toUpperCase();
  var sensor_value = Blockly.Arduino.valueToCode(this, 'Value', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
  Blockly.Arduino.definitions_['SENSOR_ID' + id + ''] = 'const char SENSOR_ID' + id + '[] PROGMEM = "' + sensor_id + '";';
  code += 'addMeasurement(SENSOR_ID' + id + ',' + sensor_value + ');\n';
  return code;
};
/*
Blockly.Arduino.sensebox_send_mobile_to_osem = function (block) {
  var box_id = this.getFieldValue('BoxID');
  var sensor_id = this.getFieldValue('SensorID') || '90909';
  var sensor_value = Blockly.Arduino.valueToCode(this, 'Value', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
  var sensor_id = this.getFieldValue('SensorID');
  var id = sensor_id.slice(-3).toUpperCase();
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.definitions_['lengthMultiplikator'] = 'const int lengthMultiplikator = 77;';
  Blockly.Arduino.definitions_['SENSOR_ID' + id + ''] = 'const char SENSOR_ID' + id + '[] PROGMEM = "' + sensor_id + '";';
  Blockly.Arduino.definitions_['GpsTimeStamp'] = 'char* tsBuffer;';
  Blockly.Arduino.definitions_['GpsLatitude'] = 'float latitude;';
  Blockly.Arduino.definitions_['GpsLongitude'] = 'float longitude;';
  Blockly.Arduino.definitions_['GpsAltitude'] = 'float height;';
  Blockly.Arduino.definitions_['define_gps'] = 'GPS gps;';
  Blockly.Arduino.userFunctions_['submitValues'] = `
  void submitValues() {
    if (client.connected()) {
      client.stop();
      delay(10);
    }
    bool connected = false;
    char _server[strlen_P(server)];
    strcpy_P(_server, server);
    for (uint8_t timeout = 2; timeout != 0; timeout--) {
    Serial.println(F("connecting..."));
    connected = client.connect(_server, 443);
    if (connected == true) {
      // construct the HTTP POST request:
      sprintf_P(buffer,
              PSTR("POST /boxes/%s/data HTTP/1.1\\nHost: %s\\nContent-Type: "
                   "text/csv\\nConnection: close\\nContent-Length: %i\\n\\n"),
              SENSEBOX_ID, server, num_measurements * lengthMultiplikator);
      // send the HTTP POST request:
      client.print(buffer);
      // send measurements
      writeMeasurementsToClient(latitude, longitude, height, tsBuffer);
      // send empty line to end the request
      client.println();
      uint16_t timeout = 0;
      // allow the response to be computed
      while (timeout <= 5000) {
        delay(10);
        timeout = timeout + 10;
        if (client.available()) {
          break;
        }
      }
    num_measurements = 0;
    break;
    }
  }
}`;
  Blockly.Arduino.setups_['sensebox_gps_begin'] = 'gps.begin();';
  Blockly.Arduino.loops_['gps.getGPS'] = 'gps.getGPS();';
  Blockly.Arduino.loops_['gps.getLatitude'] = 'latitude = gps.getLatitude();';
  Blockly.Arduino.loops_['gps.getLongitude'] = 'longitude = gps.getLongitude();';
  Blockly.Arduino.loops_['gps.getAltitude'] = 'height = gps.getAltitude();';
  Blockly.Arduino.loops_['gps.getTimeStamp'] = 'tsBuffer = gps.getTimeStamp();';
  var code = '';
  code += ('addMeasurement(SENSOR_ID' + id + ',' + sensor_value + ');\n');
  return code;
};*/

Blockly.Arduino.sensebox_shield_ethernet = function (block) {
  Blockly.Arduino.definitions_['define_senseBox'] = '#include "SenseBox.h"';
  Blockly.Arduino.definitions_['define_network'] = 'OpenSenseMap wifi("' + box_id + '");';
  Blockly.Arduino.setups_['sensebox_network'] = 'wifi.beginEthernet();';
  var box_id = this.getFieldValue('box_id');
  var code = '';
  //extra blöcke sensor
  for (var n = 1; n <= 5; n++) {
    if (Blockly.Arduino.valueToCode(this, 'TEXT' + n, Blockly.Arduino.ORDER_ATOMIC)) {
      var sensor_id = this.getFieldValue('ID' + n) || '90909';
      var sensor_value = Blockly.Arduino.valueToCode(this, 'TEXT' + n, Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
      code += ' shield.uploadValue(' + sensor_value + ',"' + sensor_id + '");\n';
    } else {
      code += '//kein Sensor an Port ' + n + '\n';
    }
  }
  return code;
};



/*
----------------------------------Basics--------------------------------------------------
*/
Blockly.Arduino.sensebox_led = function () {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_green_led_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  var code = 'digitalWrite(' + dropdown_pin + ',' + dropdown_stat + ');\n'
  return code;
};

Blockly.Arduino.sensebox_button = function () {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropown_function = this.getFieldValue('FUNCTION');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.definitions_['define_button' + dropdown_pin + ''] = 'Button button_' + dropdown_pin + '(' + dropdown_pin + ');';
  Blockly.Arduino.setups_['setup_button' + dropdown_pin + ''] = 'button_' + dropdown_pin + '.begin();';
  var code = '';
  if (dropown_function == 'isPressed') {
    code += 'button_' + dropdown_pin + '.isPressed()';
  }
  else if (dropown_function == 'Switch') {
    code += 'button_' + dropdown_pin + '.getSwitch()';
  }
  else if (dropown_function == 'wasPressed') {
    code += 'button_' + dropdown_pin + '.wasPressed()';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_poti = function () {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_poti'] = 'pinMode(' + dropdown_pin + ', INPUT);';
  var code = 'analogRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_foto = function () {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_foto'] = 'pinMode(' + dropdown_pin + ', INPUT);';
  var code = 'analogRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_rgb_led = function () {
  var dropdown_pin = this.getFieldValue('PIN');
  var red = Blockly.Arduino.valueToCode(this, 'RED', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var green = Blockly.Arduino.valueToCode(this, 'GREEN', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var blue = Blockly.Arduino.valueToCode(this, 'BLUE', Blockly.Arduino.ORDER_ATOMIC) || '0'
  Blockly.Arduino.definitions_['define_rgb_led' + dropdown_pin] = '#include <Adafruit_NeoPixel.h>\n Adafruit_NeoPixel rgb_led_' + dropdown_pin + ' = Adafruit_NeoPixel(1,' + dropdown_pin + ',NEO_RGB + NEO_KHZ800);\n';
  Blockly.Arduino.setups_['setup_rgb_led' + dropdown_pin] = 'rgb_led_' + dropdown_pin + '.begin();';

  var code = 'rgb_led_' + dropdown_pin + '.setPixelColor(0,rgb_led_' + dropdown_pin + '.Color(' + red + ',' + green + ',' + blue + '));\n';
  code += 'rgb_led_' + dropdown_pin + '.show();';
  return code;
};
/*
----------------------------------Ausgabe--------------------------------------------------
*/
Blockly.Arduino.sensebox_serial_print = function () {
  Blockly.Arduino.setups_['sensebox_serial_print'] = '//Setup Serial Print\n  Serial.begin(9600);\n';
  var linebreak = this.getFieldValue('LINEBREAK');
  if (linebreak == "TRUE") {
    linebreak = "ln";
  } else {
    linebreak = "";
  }
  var text = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
  var code = 'Serial.print' + linebreak + '(' + text + ');\n';
  return code;
};

/* SD-Card Blocks using the Standard SD Library*/
/**
 * Code generator for variable (X) getter.
 * Arduino code: loop { X }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */

Blockly.Arduino.sensebox_sd_create_file = function (block) {
  var filename = this.getFieldValue('Filename');
  Blockly.Arduino.includes_['library_spi'] = '#include <SPI.h>';
  Blockly.Arduino.includes_['library_sd'] = '#include <SD.h>';
  Blockly.Arduino.definitions_['define_' + filename] = 'File dataFile' + filename + ';';
  Blockly.Arduino.setups_['sensebox_sd'] = 'SD.begin(28);';
  Blockly.Arduino.setups_['sensebox_sd' + filename] = 'dataFile' + filename + ' = SD.open("' + filename + '.txt", FILE_WRITE);\ndataFile' + filename + '.close();\n';
  var code = '';
  return code;
};

Blockly.Arduino.sensebox_sd_open_file = function (block) {
  var filename = this.getFieldValue('Filename');
  var text = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
  var branch = Blockly.Arduino.statementToCode(block, 'SD');
  var code = 'dataFile' + filename + ' = SD.open("' + filename + '.txt", FILE_WRITE);\n'
  code += branch;
  code += 'dataFile' + filename + '.close();\n'
  return code;
};

Blockly.Arduino.sensebox_sd_write_file = function (block) {
  if (this.parentBlock_ != null) {
    var filename = this.getSurroundParent().getFieldValue('Filename');
  }
  var text = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
  var linebreak = this.getFieldValue('linebreak');
  if (linebreak == "TRUE") {
    linebreak = "ln";
  } else {
    linebreak = "";
  }
  if (text == "gps.getLongitude()" || text == "gps.getLatitude()") {
    var code = 'dataFile' + filename + '.print' + linebreak + '(' + text + ',5);\n'
  }
  else {
    var code = 'dataFile' + filename + '.print' + linebreak + '(' + text + ');\n'
  }
  return code;
};

/*Display Blocks*/
Blockly.Arduino.sensebox_display_beginDisplay = function () {
  Blockly.Arduino.includes_['library_spi'] = '#include <SPI.h>';
  Blockly.Arduino.includes_['library_wire'] = '#include <Wire.h>';
  Blockly.Arduino.includes_['library_AdafruitGFX'] = '#include <Adafruit_GFX.h>';
  Blockly.Arduino.includes_['library_AdafruitSSD1306'] = '#include <Adafruit_SSD1306.h>';
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.definitions_['define_display'] = '#define OLED_RESET 4\nAdafruit_SSD1306 display(OLED_RESET);';
  Blockly.Arduino.setups_['sensebox_display_begin'] = 'senseBoxIO.powerI2C(true);\ndelay(2000);\ndisplay.begin(SSD1306_SWITCHCAPVCC, 0x3D);\ndisplay.display();\ndelay(100);\ndisplay.clearDisplay();';
  var code = '';
  return code;
};

Blockly.Arduino.sensebox_display_clearDisplay = function () {
  var code = 'display.clearDisplay();\n';
  return code;
};

Blockly.Arduino.sensebox_display_printDisplay = function () {
  var x = Blockly.Arduino.valueToCode(this, 'X', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var y = Blockly.Arduino.valueToCode(this, 'Y', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var printDisplay = Blockly.Arduino.valueToCode(this, 'printDisplay', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
  var size = Blockly.Arduino.valueToCode(this, 'SIZE', Blockly.Arduino.ORDER_ATOMIC) || '1'
  var color = this.getFieldValue('COLOR');
  var code = 'display.setCursor(' + x + ',' + y + ');\n';
  code += 'display.setTextSize(' + size + ');\n';
  code += 'display.setTextColor(' + color + ');\n';
  code += 'display.println(' + printDisplay + ');\n';
  return code;
};

Blockly.Arduino.sensebox_display_show = function (block) {
  var show = Blockly.Arduino.statementToCode(block, 'SHOW');
  var code = '';
  code += show;
  code += 'display.display();\n';
  return code;
};
Blockly.Arduino.sensebox_display_plotDisplay = function () {
  var YLabel = Blockly.Arduino.valueToCode(this, 'YLabel', Blockly.Arduino.ORDER_ATOMIC) || 'Y'
  var XLabel = Blockly.Arduino.valueToCode(this, 'XLabel', Blockly.Arduino.ORDER_ATOMIC) || 'X'
  var Title = Blockly.Arduino.valueToCode(this, 'Title', Blockly.Arduino.ORDER_ATOMIC) || 'Title'
  var XRange1 = Blockly.Arduino.valueToCode(this, 'XRange1', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var XRange2 = Blockly.Arduino.valueToCode(this, 'XRange2', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var YRange1 = Blockly.Arduino.valueToCode(this, 'YRange1', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var YRange2 = Blockly.Arduino.valueToCode(this, 'YRange2', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var XTick = Blockly.Arduino.valueToCode(this, 'XTick', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var YTick = Blockly.Arduino.valueToCode(this, 'YTick', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var TimeFrame = Blockly.Arduino.valueToCode(this, 'TimeFrame', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var plotDisplay = Blockly.Arduino.valueToCode(this, 'plotDisplay', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
  Blockly.Arduino.includes_['library_plot'] = '#include <Plot.h>';
  Blockly.Arduino.definitions_['define_plot_class'] = 'Plot DataPlot(&display);\n';
  Blockly.Arduino.variables_['define_plot_class'] = 'const double TIMEFRAME = ' + TimeFrame + ';\n';
  Blockly.Arduino.setups_['sensebox_plot_setup'] = 'DataPlot.setTitle(' + Title + ');\nDataPlot.setXLabel(' + XLabel + ');\nDataPlot.setYLabel(' + YLabel + ');\nDataPlot.setXRange(' + XRange1 + ',' + XRange2 + ');\nDataPlot.setYRange(' + YRange1 + ',' + YRange2 + ');\nDataPlot.setXTick(' + XTick + ');\nDataPlot.setYTick(' + YTick + ');\nDataPlot.setXPrecision(0);\nDataPlot.setYPrecision(0);\n';
  var code = 'DataPlot.clear();'
  code += 'double starttime = millis();\ndouble t = 0;\nwhile (t <= TIMEFRAME) {\nt = (millis() - starttime) / 1000.0;\nfloat value = ' + plotDisplay + ';\n';
  code += 'DataPlot.addDataPoint(t,value);\n}\n';
  return code;
};

Blockly.Arduino.sensebox_display_fillCircle = function () {
  var x = Blockly.Arduino.valueToCode(this, 'X', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var y = Blockly.Arduino.valueToCode(this, 'Y', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var radius = Blockly.Arduino.valueToCode(this, 'Radius', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var fill = this.getFieldValue('FILL');
  if (fill == 'TRUE') {
    var code = 'display.fillCircle(' + x + ',' + y + ',' + radius + ',1);\n';
  }
  else {
    var code = 'display.drawCircle(' + x + ',' + y + ',' + radius + ',1);\n';
  }
  return code;
}

Blockly.Arduino.sensebox_display_drawRectangle = function () {
  var x = Blockly.Arduino.valueToCode(this, 'X', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var y = Blockly.Arduino.valueToCode(this, 'Y', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var width = Blockly.Arduino.valueToCode(this, 'width', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var height = Blockly.Arduino.valueToCode(this, 'height', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var fill = this.getFieldValue('FILL');
  if (fill == 'TRUE') {
    var code = 'display.fillRect(' + x + ',' + y + ',' + width + ',' + height + ',1);\n';
  }
  else {
    var code = 'display.drawRect(' + x + ',' + y + ',' + width + ',' + height + ',1);\n';
  }
  return code;
}

//--GPS--//

Blockly.Arduino.sensebox_gps_getValues = function () {
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  var dropdown_name = this.getFieldValue("Values");
  Blockly.Arduino.definitions_['define_gps'] = 'GPS gps;';
  Blockly.Arduino.setups_['sensebox_gps_begin'] = 'gps.begin();';
  Blockly.Arduino.loops_['gps.getGPS'] = 'gps.getGPS();'
  switch (dropdown_name) {
    case 'latitude':
      Blockly.Arduino.definitions_['GpsLatitude'] = 'float latitude;';
      Blockly.Arduino.loops_['gps.getLatitude'] = 'latitude = gps.getLatitude();';
      var code = 'latitude';
      break;
    case 'longitude':
      Blockly.Arduino.definitions_['GpsLongitude'] = 'float longitude;';
      Blockly.Arduino.loops_['gps.getLongitude'] = 'longitude = gps.getLongitude();';
      var code = 'longitude';
      break;
    case 'height':
      Blockly.Arduino.definitions_['GpsAltitude'] = 'float height;';
      Blockly.Arduino.loops_['gps.getAltitude'] = 'height = gps.getAltitude();';
      var code = 'height';
      break;
    case 'tsBuffer':
      Blockly.Arduino.definitions_['GpsTimeStamp'] = 'char* tsBuffer;';
      Blockly.Arduino.loops_['gps.getTimeStamp'] = 'tsBuffer = gps.getTimeStamp();';
      var code = 'tsBuffer';
      break;
    case 'Speed':
      Blockly.Arduino.definitions_['GpsSpeed'] = 'float speed;';
      Blockly.Arduino.loops_['gps.getSpeed'] = 'speed = gps.getSpeed();';
      var code = 'speed';
      break;
    case 'Time':
      Blockly.Arduino.definitions_['GpsTime'] = 'float time;';
      Blockly.Arduino.loops_['gps.getTime'] = ' time = gps.getTime();';
      var code = 'time';
      break;
    case 'Date':
      Blockly.Arduino.definitions_['GpsDate'] = 'float date;';
      Blockly.Arduino.loops_['gps.getDate'] = 'date = gps.getDate();';
      var code = 'date';
      break;
    default:
      var code = '';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Webserver Blocks by Lucas Steinmann
 * 
 */

Blockly.Arduino.sensebox_initialize_http_server = function (block) {
  var box_id = this.getFieldValue('Port');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.codeFunctions_['define_wifi_server'] = 'WiFiServer server(' + box_id + ');';
  Blockly.Arduino.setups_['sensebox_wifi_server_beging'] = 'server.begin();';
  return '';
};

Blockly.Arduino.sensebox_http_on_client_connect = function (block) {
  var onConnect = Blockly.Arduino.statementToCode(block, 'ON_CONNECT');
  var code = '';
  code += 'WiFiClient client = server.available();\n';
  code += 'if (client && client.available()) {\n';
  code += '  String request_string = listenClient(client);\n';
  code += '  Request request;\n';
  code += '  if (parseRequestSafe(request_string, request)) {\n';
  code += onConnect;
  code += '  }\n';
  code += '  delay(1);\n';
  code += '  client.stop();\n';
  code += '  delay(1);\n';
  code += '}\n';
  return code;
};

Blockly.Arduino.sensebox_http_method = function (block) {
  var code = "request.method";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.sensebox_http_uri = function (block) {
  var code = "request.uri";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_http_protocol_version = function (block) {
  var code = "request.protocol_version";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_http_user_agent = function (block) {
  var code = "request.user_agent";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_generate_html_doc = function (block) {
  var header = Blockly.Arduino.valueToCode(block, 'HEADER', Blockly.Arduino.ORDER_NONE) || '""';
  var body = Blockly.Arduino.valueToCode(block, 'BODY', Blockly.Arduino.ORDER_NONE) || '""';
  var code = 'buildHTML(' + header + ', ' + body + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_generate_http_succesful_response = function (block) {
  var content = Blockly.Arduino.valueToCode(block, 'CONTENT', Blockly.Arduino.ORDER_NONE) || '""';
  var code = 'client.println(buildSuccessfulResponse(request, ' + content + '));\n';
  return code;
};

Blockly.Arduino.sensebox_generate_http_not_found_response = function (block) {
  var code = 'client.println(buildNotFoundResponse(request));\n';
  return code;
};


Blockly.Arduino.sensebox_ip_address = function (block) {
  var code = "b->getIpAddress()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_general_html_tag = function (block) {
  var tag = this.getFieldValue('TAG');
  var code = 'buildTag("' + tag + '",';
  var n = 0;
  var branch = Blockly.Arduino.valueToCode(block, 'DO' + n, Blockly.Arduino.ORDER_NONE);
  if (branch.length > 0) {
    code += '\n ' + branch;
  } else {
    code += '""';
  }
  for (n = 1; n <= block.additionalChildCount_; n++) {
    branch = Blockly.Arduino.valueToCode(block, 'DO' + n, Blockly.Arduino.ORDER_NONE);
    code += ' +' + branch;
  }
  return [code + ')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_web_readHTML = function (block) {
  var filename = this.getFieldValue('FILENAME');
  Blockly.Arduino.includes_['library_spi'] = '#include <SPI.h>';
  Blockly.Arduino.includes_['library_sd'] = '#include <SD.h>';
  Blockly.Arduino.codeFunctions_['define_sd' + filename] = 'File webFile;';
  Blockly.Arduino.setups_['sensebox_sd'] = 'SD.begin(28);';
  var func = [
    'String generateHTML(){',
    ' webFile = SD.open("' + filename + '", FILE_READ);',
    ' String finalString ="";',
    ' while (webFile.available())',
    '   {',
    '   finalString+=(char)webFile.read();',
    '   }',
    ' return finalString;',
    '}'];
  var functionName = Blockly.Arduino.addFunction(
    'generateHTML', func.join('\n'));
  var code = functionName + '()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
// Webserver Blöcke 



/* LoRa Blöcke
*
* */


Blockly.Arduino.sensebox_lora_initialize_otaa = function (block) {
  var deivceID = this.getFieldValue('DEVICEID');
  var appID = this.getFieldValue('APPID');
  var appKey = this.getFieldValue('APPKEY');
  var interval = this.getFieldValue('INTERVAL');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.includes_['library_spi'] = '#include <SPI.h>';
  Blockly.Arduino.includes_['library_lmic'] = '#include <lmic.h>';
  Blockly.Arduino.includes_['library_hal'] = '#include <hal/hal.h>';
  Blockly.Arduino.definitions_['define_LoRaVariablesOTAA'] = `
  static const u1_t PROGMEM APPEUI[8]= `+ appID + ` ;
  void os_getArtEui (u1_t* buf) { memcpy_P(buf, APPEUI , 8);}

  static const u1_t PROGMEM DEVEUI[8]= `+ deivceID + `;
  void os_getDevEui (u1_t* buf) { memcpy_P(buf, DEVEUI , 8);}

  // This key should be in big endian format (or, since it is not really a
  // number but a block of memory, endianness does not really apply). In
  // practice, a key taken from ttnctl can be copied as-is.
  // The key shown here is the semtech default key.
  static const u1_t PROGMEM APPKEY[16] = `+ appKey + `;
  void os_getDevKey (u1_t* buf) {  memcpy_P(buf, APPKEY , 16);}

  static osjob_t sendjob;

  // Schedule TX every this many seconds (might become longer due to duty
  // cycle limitations).
  const unsigned TX_INTERVAL = ${interval * 60};

  // Pin mapping
  const lmic_pinmap lmic_pins = {
      .nss = PIN_XB1_CS,
      .rxtx = LMIC_UNUSED_PIN,
      .rst = LMIC_UNUSED_PIN,
      .dio = {PIN_XB1_INT, PIN_XB1_INT, LMIC_UNUSED_PIN},
  };`;

  Blockly.Arduino.codeFunctions_['functions_initLora'] = `
  void initLora() {
    delay(2000);
    // LMIC init
    os_init();
    // Reset the MAC state. Session and pending data transfers will be discarded.
    LMIC_reset();
  
    // Start job (sending automatically starts OTAA too)
    do_send(&sendjob);
  }`

  Blockly.Arduino.codeFunctions_['functions_onEvent'] = `
  void onEvent (ev_t ev) {
    Serial.print(os_getTime());
    Serial.print(": ");
    switch(ev) {
        case EV_SCAN_TIMEOUT:
            Serial.println(F("EV_SCAN_TIMEOUT"));
            break;
        case EV_BEACON_FOUND:
            Serial.println(F("EV_BEACON_FOUND"));
            break;
        case EV_BEACON_MISSED:
            Serial.println(F("EV_BEACON_MISSED"));
            break;
        case EV_BEACON_TRACKED:
            Serial.println(F("EV_BEACON_TRACKED"));
            break;
        case EV_JOINING:
            Serial.println(F("EV_JOINING"));
            break;
        case EV_JOINED:
            Serial.println(F("EV_JOINED"));

            // Disable link check validation (automatically enabled
            // during join, but not supported by TTN at this time).
            LMIC_setLinkCheckMode(0);
            break;
        case EV_RFU1:
            Serial.println(F("EV_RFU1"));
            break;
        case EV_JOIN_FAILED:
            Serial.println(F("EV_JOIN_FAILED"));
            break;
        case EV_REJOIN_FAILED:
            Serial.println(F("EV_REJOIN_FAILED"));
            break;
            break;
        case EV_TXCOMPLETE:
            Serial.println(F("EV_TXCOMPLETE (includes waiting for RX windows)"));
            if (LMIC.txrxFlags & TXRX_ACK)
              Serial.println(F("Received ack"));
            if (LMIC.dataLen) {
              Serial.println(F("Received "));
              Serial.println(LMIC.dataLen);
              Serial.println(F(" bytes of payload"));
            }
            // Schedule next transmission
            os_setTimedCallback(&sendjob, os_getTime()+sec2osticks(TX_INTERVAL), do_send);
            break;
        case EV_LOST_TSYNC:
            Serial.println(F("EV_LOST_TSYNC"));
            break;
        case EV_RESET:
            Serial.println(F("EV_RESET"));
            break;
        case EV_RXCOMPLETE:
            // data received in ping slot
            Serial.println(F("EV_RXCOMPLETE"));
            break;
        case EV_LINK_DEAD:
            Serial.println(F("EV_LINK_DEAD"));
            break;
        case EV_LINK_ALIVE:
            Serial.println(F("EV_LINK_ALIVE"));
            break;
         default:
            Serial.println(F("Unknown event"));
            break;
    }
}`;
  Blockly.Arduino.setups_['initLora'] = 'initLora();';
  Blockly.Arduino.setups_['serial.begin'] = 'Serial.begin(9600);';
  var code = ''
  return code;
};

Blockly.Arduino.sensebox_lora_message_send = function (block) {
  Blockly.Arduino.includes_['library_lora_message'] = '#include <LoraMessage.h>';
  var lora_sensor_values = Blockly.Arduino.statementToCode(block, 'DO');
  Blockly.Arduino.userFunctions_['functions_do_send'] = `
void do_send(osjob_t* j){
    // Check if there is not a current TX/RX job running
    if (LMIC.opmode & OP_TXRXPEND) {
        Serial.println(F("OP_TXRXPEND, not sending"));
    } else {
      LoraMessage message;
      ${lora_sensor_values}

      // Prepare upstream data transmission at the next possible time.
      LMIC_setTxData2(1, message.getBytes(), message.getLength(), 0);
      Serial.println(F("Packet queued"));
    }
    // Next TX is scheduled after TX_COMPLETE event.
}`;
  Blockly.Arduino.loops_['os_runloop'] = 'os_runloop_once();'
  return ''
}

/**
 * Block send Data to TTN
 */
Blockly.Arduino.sensebox_send_lora_sensor_value = function (block) {
  const reading = Blockly.Arduino.valueToCode(this, 'Value', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
  var messageBytes = this.getFieldValue('MESSAGE_BYTES');
  var code = ''
  switch (Number(messageBytes)) {
    case 1:
      code = `message.addUint8(${reading});\n`
      break;
    case 2:
      code = `message.addUint16(${reading});\n`
      break;
    case 3:
      code = `message.addUint8(${reading});
      message.addUint16(${reading} >> 8);\n`
      break;
    default:
      code = `message.addUint16(${reading});\n`
  }
  return code;
};

Blockly.Arduino.sensebox_lora_cayenne_send = function (block) {
  Blockly.Arduino.includes_['library_cayene'] = '#include <CayenneLPP.h>';
  Blockly.Arduino.variables_['variable_cayenne'] = 'CayenneLPP lpp(51);'
  var lora_sensor_values = Blockly.Arduino.statementToCode(block, 'DO');
  Blockly.Arduino.userFunctions_['functions_do_send'] = `
void do_send(osjob_t* j){
    // Check if there is not a current TX/RX job running
    if (LMIC.opmode & OP_TXRXPEND) {
        Serial.println(F("OP_TXRXPEND, not sending"));
    } else {
        lpp.reset();
        ${lora_sensor_values}

        // Prepare upstream data transmission at the next possible time.
        LMIC_setTxData2(1, lpp.getBuffer(), lpp.getSize(), 0);
        Serial.println(F("Packet queued"));
    }
    // Next TX is scheduled after TX_COMPLETE event.
}`;
  Blockly.Arduino.loops_['os_runloop'] = 'os_runloop_once();'
  return '';
}

Blockly.Arduino.sensebox_lora_initialize_abp = function (block) {
  var nwskey = this.getFieldValue('NWSKEY');
  var appskey = this.getFieldValue('APPSKEY');
  var devaddr = this.getFieldValue('DEVADDR');
  var interval = this.getFieldValue('INTERVAL');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.includes_['library_spi'] = '#include <SPI.h>';
  Blockly.Arduino.includes_['library_lmic'] = '#include <lmic.h>';
  Blockly.Arduino.includes_['library_hal'] = '#include <hal/hal.h>';
  Blockly.Arduino.definitions_['define_LoRaVariablesABP'] = `
  // LoRaWAN NwkSKey, network session key
  // This is the default Semtech key, which is used by the early prototype TTN
  // network.
  static const PROGMEM u1_t NWKSKEY[16] = ${nwskey};
  
  // LoRaWAN AppSKey, application session key
  // This is the default Semtech key, which is used by the early prototype TTN
  // network.
  static const u1_t PROGMEM APPSKEY[16] = ${appskey};
  
  // LoRaWAN end-device address (DevAddr)
  static const u4_t DEVADDR = 0x${devaddr};
  
  // These callbacks are only used in over-the-air activation, so they are
  // left empty here (we cannot leave them out completely unless
  // DISABLE_JOIN is set in config.h, otherwise the linker will complain).
  void os_getArtEui (u1_t* buf) { }
  void os_getDevEui (u1_t* buf) { }
  void os_getDevKey (u1_t* buf) { }
  
  static osjob_t sendjob;
  
  // Schedule TX every this many seconds (might become longer due to duty
  // cycle limitations).
  const unsigned TX_INTERVAL = ${interval * 60};
  
  // Pin mapping
  const lmic_pinmap lmic_pins = {
      .nss = PIN_XB1_CS,
      .rxtx = LMIC_UNUSED_PIN,
      .rst = LMIC_UNUSED_PIN,
      .dio = {PIN_XB1_INT, PIN_XB1_INT, LMIC_UNUSED_PIN},
  };`;

  Blockly.Arduino.codeFunctions_['functions_initLora'] = `
  void initLora() {
    delay(2000);
    // LMIC init
    os_init();
    // Reset the MAC state. Session and pending data transfers will be discarded.
    LMIC_reset();

    // Set static session parameters. Instead of dynamically establishing a session
    // by joining the network, precomputed session parameters are be provided.
    #ifdef PROGMEM
    // On AVR, these values are stored in flash and only copied to RAM
    // once. Copy them to a temporary buffer here, LMIC_setSession will
    // copy them into a buffer of its own again.
    uint8_t appskey[sizeof(APPSKEY)];
    uint8_t nwkskey[sizeof(NWKSKEY)];
    memcpy_P(appskey, APPSKEY, sizeof(APPSKEY));
    memcpy_P(nwkskey, NWKSKEY, sizeof(NWKSKEY));
    LMIC_setSession (0x1, DEVADDR, nwkskey, appskey);
    #else
    // If not running an AVR with PROGMEM, just use the arrays directly
    LMIC_setSession (0x1, DEVADDR, NWKSKEY, APPSKEY);
    #endif

    #if defined(CFG_eu868)
    // Set up the channels used by the Things Network, which corresponds
    // to the defaults of most gateways. Without this, only three base
    // channels from the LoRaWAN specification are used, which certainly
    // works, so it is good for debugging, but can overload those
    // frequencies, so be sure to configure the full frequency range of
    // your network here (unless your network autoconfigures them).
    // Setting up channels should happen after LMIC_setSession, as that
    // configures the minimal channel set.
    // NA-US channels 0-71 are configured automatically
    LMIC_setupChannel(0, 868100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(1, 868300000, DR_RANGE_MAP(DR_SF12, DR_SF7B), BAND_CENTI);      // g-band
    LMIC_setupChannel(2, 868500000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(3, 867100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(4, 867300000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(5, 867500000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(6, 867700000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(7, 867900000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(8, 868800000, DR_RANGE_MAP(DR_FSK,  DR_FSK),  BAND_MILLI);      // g2-band
    // TTN defines an additional channel at 869.525Mhz using SF9 for class B
    // devices' ping slots. LMIC does not have an easy way to define set this
    // frequency and support for class B is spotty and untested, so this
    // frequency is not configured here.
    #elif defined(CFG_us915)
    // NA-US channels 0-71 are configured automatically
    // but only one group of 8 should (a subband) should be active
    // TTN recommends the second sub band, 1 in a zero based count.
    // https://github.com/TheThingsNetwork/gateway-conf/blob/master/US-global_conf.json
    LMIC_selectSubBand(1);
    #endif

    // Disable link check validation
    LMIC_setLinkCheckMode(0);

    // TTN uses SF9 for its RX2 window.
    LMIC.dn2Dr = DR_SF9;

    // Set data rate and transmit power for uplink (note: txpow seems to be ignored by the library)
    LMIC_setDrTxpow(DR_SF7,14);

    // Start job
    do_send(&sendjob);
  }`

  Blockly.Arduino.codeFunctions_['functions_onEvent'] = `
  void onEvent (ev_t ev) {
    Serial.print(os_getTime());
    Serial.print(": ");
    switch(ev) {
        case EV_SCAN_TIMEOUT:
            Serial.println(F("EV_SCAN_TIMEOUT"));
            break;
        case EV_BEACON_FOUND:
            Serial.println(F("EV_BEACON_FOUND"));
            break;
        case EV_BEACON_MISSED:
            Serial.println(F("EV_BEACON_MISSED"));
            break;
        case EV_BEACON_TRACKED:
            Serial.println(F("EV_BEACON_TRACKED"));
            break;
        case EV_JOINING:
            Serial.println(F("EV_JOINING"));
            break;
        case EV_JOINED:
            Serial.println(F("EV_JOINED"));
            break;
        case EV_RFU1:
            Serial.println(F("EV_RFU1"));
            break;
        case EV_JOIN_FAILED:
            Serial.println(F("EV_JOIN_FAILED"));
            break;
        case EV_REJOIN_FAILED:
            Serial.println(F("EV_REJOIN_FAILED"));
            break;
        case EV_TXCOMPLETE:
            Serial.println(F("EV_TXCOMPLETE (includes waiting for RX windows)"));
            if (LMIC.txrxFlags & TXRX_ACK)
              Serial.println(F("Received ack"));
            if (LMIC.dataLen) {
              Serial.println(F("Received "));
              Serial.println(LMIC.dataLen);
              Serial.println(F(" bytes of payload"));
            }
            // Schedule next transmission
            os_setTimedCallback(&sendjob, os_getTime()+sec2osticks(TX_INTERVAL), do_send);
            break;
        case EV_LOST_TSYNC:
            Serial.println(F("EV_LOST_TSYNC"));
            break;
        case EV_RESET:
            Serial.println(F("EV_RESET"));
            break;
        case EV_RXCOMPLETE:
            // data received in ping slot
            Serial.println(F("EV_RXCOMPLETE"));
            break;
        case EV_LINK_DEAD:
            Serial.println(F("EV_LINK_DEAD"));
            break;
        case EV_LINK_ALIVE:
            Serial.println(F("EV_LINK_ALIVE"));
            break;
         default:
            Serial.println(F("Unknown event"));
            break;
    }
}`;
  Blockly.Arduino.setups_['initLora'] = 'initLora();';
  Blockly.Arduino.setups_['serial.begin'] = 'Serial.begin(9600);';
  return '';
}

Blockly.Arduino.sensebox_lora_cayenne_temperature = function (block) {
  var temperature = Blockly.Arduino.valueToCode(this, 'Value', Blockly.Arduino.ORDER_ATOMIC) || 0
  var channel = this.getFieldValue('CHANNEL');
  var code = `lpp.addTemperature(${channel}, ${temperature});\n`;
  return code;
}

Blockly.Arduino.sensebox_lora_cayenne_humidity = function (block) {
  var humidity = Blockly.Arduino.valueToCode(this, 'Value', Blockly.Arduino.ORDER_ATOMIC) || 0
  var channel = this.getFieldValue('CHANNEL');
  var code = `lpp.addRelativeHumidity(${channel}, ${humidity});\n`;
  return code;
}

Blockly.Arduino.sensebox_lora_cayenne_pressure = function (block) {
  var pressure = Blockly.Arduino.valueToCode(this, 'Value', Blockly.Arduino.ORDER_ATOMIC) || 0
  var channel = this.getFieldValue('CHANNEL');
  var code = `lpp.addBarometricPressure(${channel}, ${pressure});\n`;
  return code;
}

Blockly.Arduino.sensebox_lora_cayenne_luminosity = function (block) {
  var luminosity = Blockly.Arduino.valueToCode(this, 'Value', Blockly.Arduino.ORDER_ATOMIC) || 0
  var channel = this.getFieldValue('CHANNEL');
  var code = `lpp.addLuminosity(${channel}, ${luminosity});\n`;
  return code;
}

Blockly.Arduino.sensebox_lora_cayenne_sensor = function (block) {
  var sensorValue = Blockly.Arduino.valueToCode(this, 'Value', Blockly.Arduino.ORDER_ATOMIC) || 0
  var channel = this.getFieldValue('CHANNEL');
  var code = `lpp.addAnalogInput(${channel}, ${sensorValue});\n`;
  return code;
}

Blockly.Arduino.sensebox_lora_cayenne_accelerometer = function (block) {
  var x = Blockly.Arduino.valueToCode(this, 'X', Blockly.Arduino.ORDER_ATOMIC) || 0
  var y = Blockly.Arduino.valueToCode(this, 'Y', Blockly.Arduino.ORDER_ATOMIC) || 0
  var z = Blockly.Arduino.valueToCode(this, 'Z', Blockly.Arduino.ORDER_ATOMIC) || 0
  var channel = this.getFieldValue('CHANNEL');
  var code = `lpp.addAccelerometer(${channel}, ${x}, ${y}, ${z});\n`;
  return code;
}

Blockly.Arduino.sensebox_lora_cayenne_gps = function (block) {
  var lat = Blockly.Arduino.valueToCode(this, 'LAT', Blockly.Arduino.ORDER_ATOMIC) || 0
  var lng = Blockly.Arduino.valueToCode(this, 'LNG', Blockly.Arduino.ORDER_ATOMIC) || 0
  var alt = Blockly.Arduino.valueToCode(this, 'ALT', Blockly.Arduino.ORDER_ATOMIC) || 0
  var channel = this.getFieldValue('CHANNEL');
  var code = `lpp.addGPS(${channel}, ${lat}, ${lng}, ${alt});\n`
  return code;
}

/**
 * Telegram Bot by re:edu
 */
Blockly.Arduino.sensebox_telegram = function (block) {
  var token = this.getFieldValue('telegram_token');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.includes_['library_telegram'] = `#include <UniversalTelegramBot.h>`
  Blockly.Arduino.definitions_['WiFiSSLClient'] = 'WiFiSSLClient client;';
  Blockly.Arduino.definitions_['telegram_objects'] = `#define BOTtoken "${token}"  // your Bot Token (Get from Botfather)
  
UniversalTelegramBot bot(BOTtoken, client);`

  var code = '';
  return code;
};

Blockly.Arduino.sensebox_telegram_do = function (block) {
  var messageProcessing = Blockly.Arduino.statementToCode(block, 'telegram_do', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.definitions_['telegram_variables'] = `int Bot_mtbs = 1000; //mean time between scan messages
long Bot_lasttime;   //last time messages' scan has been done`

  Blockly.Arduino.loops_['sensebox_telegram_loop'] = `if (millis() > Bot_lasttime + Bot_mtbs)  {
    int numNewMessages = bot.getUpdates(bot.last_message_received + 1);
    while(numNewMessages) {
      for(int i=0; i<numNewMessages; i++) {
        String chat_id = String(bot.messages[i].chat_id);
        String text = bot.messages[i].text;

        ${messageProcessing}
      }
      numNewMessages = bot.getUpdates(bot.last_message_received + 1);
    }
    Bot_lasttime = millis();
  }`;
  var code = '';
  return code;
};

Blockly.Arduino.sensebox_telegram_do_on_message = function (block) {
  var message = this.getFieldValue('telegram_message');
  var stuffToDo = Blockly.Arduino.statementToCode(block, 'telegram_do_on_message', Blockly.Arduino.ORDER_ATOMIC);

  var code = `
      if (text == "${message}") {
        ${stuffToDo}
      }`;
  return code;
};

Blockly.Arduino.sensebox_telegram_send = function (block) {
  var textToSend = Blockly.Arduino.valueToCode(this, 'telegram_text_to_send', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';

  var code = `bot.sendMessage(chat_id, String(${textToSend}), "");\n`;
  return code;
};


/**
 * Windspeed
 * 
 */


Blockly.Arduino.sensebox_windspeed = function () {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.userFunctions_['windspeed'] = `    
float getWindspeed(){
  float voltageWind = analogRead(`+ dropdown_pin + `) * (3.3 / 1024.0);
  float windspeed = 0.0;
  if (voltageWind >= 0.018){
    float poly1 = pow(voltageWind, 3);
    poly1 = 17.0359801998299 * poly1;
    float poly2 = pow(voltageWind, 2);
    poly2 = 47.9908168343362 * poly2;
    float poly3 = 122.899677524413 * voltageWind;
    float poly4 = 0.657504127272728;
    windspeed = poly1 - poly2 + poly3 - poly4;
    windspeed = windspeed * 0.2777777777777778; //conversion in m/s
  }
    return windspeed;
}`
  var code = 'getWindspeed()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * 
 * 
 */

Blockly.Arduino.sensebox_soundsensor_dfrobot = function () {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.userFunctions_['soundsensor'] = `    
float getSoundValue(){
  float v = analogRead(`+ dropdown_pin + `) * (3.3 / 1024.0);
  float decibel = v * 50;
  return decibel;
}`
  var code = 'getSoundValue()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_scd30 = function () {
  var dropdown = this.getFieldValue('dropdown');
  Blockly.Arduino.includes_['scd30_library'] = '#include "SparkFun_SCD30_Arduino_Library.h"'
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.definitions_['SCD30'] = 'SCD30 airSensor;';
  Blockly.Arduino.variables_['scd30_temp'] = 'float scd30_temp;';
  Blockly.Arduino.variables_['scd30_humi'] = 'float scd30_humi;';
  Blockly.Arduino.variables_['scd30_co2'] = 'float scd30_co2;';
  Blockly.Arduino.setups_['init_scd30'] = ` Wire.begin();
  if (airSensor.begin() == false)
  {
    Serial.println("Air sensor not detected. Please check wiring. Freezing...");
    while (1)
      ;
  }`;
  Blockly.Arduino.loops_['scd30_getData'] = `if (airSensor.dataAvailable())
  {
   scd30_co2 = airSensor.getCO2();
   scd30_temp = airSensor.getTemperature();
   scd30_humi = airSensor.getHumidity();
  }`
  var code = '';
  switch (dropdown) {
    case 'temperature':
      code = 'scd30_temp';
      break;
    case 'humidity':
      code = 'scd30_humi';
      break;
    case 'CO2':
      code = 'scd30_co2';
      break;
    default:
      code = ''
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];

}
