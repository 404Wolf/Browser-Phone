echo "Starting janus in $PWD"
CONFIGS=./src/janus/configs
JANUS_INSTALL=$(dirname $(dirname $(which janus)))
echo $JANUS_INSTALL
janus -P "$JANUS_INSTALL/lib/janus/plugins" -F "$CONFIGS" -C "./src/janus/janus.jcfg"

