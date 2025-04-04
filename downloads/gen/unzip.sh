cd "/Users/xueyuli/Documents/GitHub/p5mirror-Xueyu/downloads/../p5projects"
#
echo unzip 1 "ims02-shane-56koQQZER"
rm -rf "./ims02-shane-56koQQZER"
mkdir "./ims02-shane-56koQQZER"
pushd "./ims02-shane-56koQQZER" > /dev/null
unzip -q "../../downloads/zips/ims02-shane-56koQQZER"
popd > /dev/null
#
echo unzip 2 "ims02-shane copy-tb_OxMmbu"
rm -rf "./ims02-shane copy-tb_OxMmbu"
mkdir "./ims02-shane copy-tb_OxMmbu"
pushd "./ims02-shane copy-tb_OxMmbu" > /dev/null
unzip -q "../../downloads/zips/ims02-shane copy-tb_OxMmbu"
popd > /dev/null
#
echo unzip 3 "twist square01 -back and forth-D3PHob59U"
rm -rf "./twist square01 -back and forth-D3PHob59U"
mkdir "./twist square01 -back and forth-D3PHob59U"
pushd "./twist square01 -back and forth-D3PHob59U" > /dev/null
unzip -q "../../downloads/zips/twist square01 -back and forth-D3PHob59U"
popd > /dev/null
#
echo unzip 4 "twist square01 -caputure when small size-_KED2X7vB"
rm -rf "./twist square01 -caputure when small size-_KED2X7vB"
mkdir "./twist square01 -caputure when small size-_KED2X7vB"
pushd "./twist square01 -caputure when small size-_KED2X7vB" > /dev/null
unzip -q "../../downloads/zips/twist square01 -caputure when small size-_KED2X7vB"
popd > /dev/null
#
echo unzip 5 "twist square01 copy copy-RULzN3eHP"
rm -rf "./twist square01 copy copy-RULzN3eHP"
mkdir "./twist square01 copy copy-RULzN3eHP"
pushd "./twist square01 copy copy-RULzN3eHP" > /dev/null
unzip -q "../../downloads/zips/twist square01 copy copy-RULzN3eHP"
popd > /dev/null
#
echo unzip 6 "twist square01-HV37u3wXz"
rm -rf "./twist square01-HV37u3wXz"
mkdir "./twist square01-HV37u3wXz"
pushd "./twist square01-HV37u3wXz" > /dev/null
unzip -q "../../downloads/zips/twist square01-HV37u3wXz"
popd > /dev/null
#
echo unzip 7 "Twisty Squares by Ivan Rudnicki copy-gEfAGJS9D"
rm -rf "./Twisty Squares by Ivan Rudnicki copy-gEfAGJS9D"
mkdir "./Twisty Squares by Ivan Rudnicki copy-gEfAGJS9D"
pushd "./Twisty Squares by Ivan Rudnicki copy-gEfAGJS9D" > /dev/null
unzip -q "../../downloads/zips/Twisty Squares by Ivan Rudnicki copy-gEfAGJS9D"
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