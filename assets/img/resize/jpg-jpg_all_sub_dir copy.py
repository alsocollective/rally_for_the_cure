import sys
import glob
import os
import math
from PIL import Image

root = os.path.dirname(os.path.realpath(__file__))


for fl in os.walk(root):
    print "========================"
    location = fl[0]
    for sublist in fl:
        if len(sublist) and type(sublist) is type([]):
            for img in sublist:
                if ".jpg" in img:
                    jpgIn = Image.open("%s/%s"%(location,img))
                    size = jpgIn.size
                    print "--------------------"
                    print "%s/%s"%(location,img)
                    print size
                    ratio = 0
                    if(size[0] > size[1]):
                        ratio = size[0]/1200.0
                        print "landscape"
                    else:
                        ratio = size[1]/1200.0
                        print "portait"
                    newSize = (int(size[0]/ratio),int(size[1]/ratio))
                    print "ratio %d" % ratio
                    print newSize
                    jpgIn = jpgIn.resize(newSize,Image.ANTIALIAS)
                    outLoc = "%s/%s.1200x1200.jpg"%(location,img[:-4])
                    jpgIn.save(outLoc)#,quality=85,optimize=True)


# for fl in glob.glob("scan*.pdf"):
#     print fl

exit()


for fl in glob.glob("scan*.pdf"):
    print fl

jpgIn = Image.open("path\\to\\image.jpg")
size = jpgIn.size

jpgfile = file("jpg%d.jpg" % njpg, "wb")
jpgfile.write(jpg)
jpgfile.close()
