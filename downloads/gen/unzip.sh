cd "/Users/xueyuli/Documents/GitHub/p5mirror-Xueyu/downloads/../p5projects"
#
echo unzip 1 "Comfortable ice copy-0-AtRRS86"
rm -rf "./Comfortable ice copy-0-AtRRS86"
mkdir "./Comfortable ice copy-0-AtRRS86"
pushd "./Comfortable ice copy-0-AtRRS86" > /dev/null
unzip -q "../../downloads/zips/Comfortable ice copy-0-AtRRS86"
popd > /dev/null
#
echo unzip 2 "Comfortable ice-JtYT0Q4oH"
rm -rf "./Comfortable ice-JtYT0Q4oH"
mkdir "./Comfortable ice-JtYT0Q4oH"
pushd "./Comfortable ice-JtYT0Q4oH" > /dev/null
unzip -q "../../downloads/zips/Comfortable ice-JtYT0Q4oH"
popd > /dev/null
#
echo unzip 3 "09 emotion recognition in real time copy-mbE3vWlKP"
rm -rf "./09 emotion recognition in real time copy-mbE3vWlKP"
mkdir "./09 emotion recognition in real time copy-mbE3vWlKP"
pushd "./09 emotion recognition in real time copy-mbE3vWlKP" > /dev/null
unzip -q "../../downloads/zips/09 emotion recognition in real time copy-mbE3vWlKP"
popd > /dev/null
#
echo unzip 4 "bodySegmentation-capturebody+video+effect-5SStRhKfD"
rm -rf "./bodySegmentation-capturebody+video+effect-5SStRhKfD"
mkdir "./bodySegmentation-capturebody+video+effect-5SStRhKfD"
pushd "./bodySegmentation-capturebody+video+effect-5SStRhKfD" > /dev/null
unzip -q "../../downloads/zips/bodySegmentation-capturebody+video+effect-5SStRhKfD"
popd > /dev/null
#
echo unzip 5 "ims05-shane-R27dgt-Wo"
rm -rf "./ims05-shane-R27dgt-Wo"
mkdir "./ims05-shane-R27dgt-Wo"
pushd "./ims05-shane-R27dgt-Wo" > /dev/null
unzip -q "../../downloads/zips/ims05-shane-R27dgt-Wo"
popd > /dev/null
#
echo unzip 6 "pop art-obaoseZPU"
rm -rf "./pop art-obaoseZPU"
mkdir "./pop art-obaoseZPU"
pushd "./pop art-obaoseZPU" > /dev/null
unzip -q "../../downloads/zips/pop art-obaoseZPU"
popd > /dev/null
#
echo unzip 7 "bodySegmentation-capturebody+video-y_v6unHac"
rm -rf "./bodySegmentation-capturebody+video-y_v6unHac"
mkdir "./bodySegmentation-capturebody+video-y_v6unHac"
pushd "./bodySegmentation-capturebody+video-y_v6unHac" > /dev/null
unzip -q "../../downloads/zips/bodySegmentation-capturebody+video-y_v6unHac"
popd > /dev/null
#
echo unzip 8 "bodySegmentation-capturebody-iF3n_GWl_"
rm -rf "./bodySegmentation-capturebody-iF3n_GWl_"
mkdir "./bodySegmentation-capturebody-iF3n_GWl_"
pushd "./bodySegmentation-capturebody-iF3n_GWl_" > /dev/null
unzip -q "../../downloads/zips/bodySegmentation-capturebody-iF3n_GWl_"
popd > /dev/null
#
echo unzip 9 "bodySegmentation-mask-body-parts copy-MdNONp1b3"
rm -rf "./bodySegmentation-mask-body-parts copy-MdNONp1b3"
mkdir "./bodySegmentation-mask-body-parts copy-MdNONp1b3"
pushd "./bodySegmentation-mask-body-parts copy-MdNONp1b3" > /dev/null
unzip -q "../../downloads/zips/bodySegmentation-mask-body-parts copy-MdNONp1b3"
popd > /dev/null
#
echo unzip 10 "rain copy-N8jHkXckQ"
rm -rf "./rain copy-N8jHkXckQ"
mkdir "./rain copy-N8jHkXckQ"
pushd "./rain copy-N8jHkXckQ" > /dev/null
unzip -q "../../downloads/zips/rain copy-N8jHkXckQ"
popd > /dev/null
#
echo unzip 11 "rain-3F8uYSpLP"
rm -rf "./rain-3F8uYSpLP"
mkdir "./rain-3F8uYSpLP"
pushd "./rain-3F8uYSpLP" > /dev/null
unzip -q "../../downloads/zips/rain-3F8uYSpLP"
popd > /dev/null
#
echo unzip 12 "ims03-shane-myjyAJ-Fb"
rm -rf "./ims03-shane-myjyAJ-Fb"
mkdir "./ims03-shane-myjyAJ-Fb"
pushd "./ims03-shane-myjyAJ-Fb" > /dev/null
unzip -q "../../downloads/zips/ims03-shane-myjyAJ-Fb"
popd > /dev/null
#
echo unzip 13 "Blurred text copy-9Tawyj742"
rm -rf "./Blurred text copy-9Tawyj742"
mkdir "./Blurred text copy-9Tawyj742"
pushd "./Blurred text copy-9Tawyj742" > /dev/null
unzip -q "../../downloads/zips/Blurred text copy-9Tawyj742"
popd > /dev/null

cd ..
# remove redundant p5.js p5.sound.min.js
rm -f p5projects/*/p5.*
# sync last_updatedAt.txt
cd downloads/json
if [ -e pending_updatedAt.txt ]; then
  rm -f last_updatedAt.txt
  mv pending_updatedAt.txt last_updatedAt.txt
fi