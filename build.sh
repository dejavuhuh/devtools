ORIGINAL_DIR=$(pwd)
cd "$(dirname "$0")" || exit
ROOT_DIR=$(pwd)

cd ${ROOT_DIR}/frontend
pnpm run build

cd ${ROOT_DIR}/backend
./gradlew clean distribution

cd $ORIGINAL_DIR