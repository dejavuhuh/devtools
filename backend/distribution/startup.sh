SERVER_NAME=devtools

cd "$(dirname "$0")" || exit
cd ..
DEPLOY_DIR=$(pwd)

LOGS_DIR=${DEPLOY_DIR}/logs
CONF_DIR=${DEPLOY_DIR}/conf
JAR_FILE=${DEPLOY_DIR}/lib/${SERVER_NAME}.jar

if [ ! -d "${LOGS_DIR}" ]; then
    mkdir "${LOGS_DIR}"
fi

STDOUT_FILE=${LOGS_DIR}/stdout.log

PIDS=$(pgrep -f "java.*$DEPLOY_DIR")

if [ -n "$PIDS" ]; then
    echo "ERROR: The $SERVER_NAME already started!"
    echo "PID: $PIDS"
    exit 1
fi

JAVA_OPTS="-Xms256M -Xmx256M -Dspring.profiles.active=prod -Dspring.config.additional-location=file:$CONF_DIR/"

echo "Starting the $SERVER_NAME ..."

java $JAVA_OPTS -jar $JAR_FILE 2>&1 | tee $STDOUT_FILE
sleep 1
echo "Please check the STDOUT file: $STDOUT_FILE"
