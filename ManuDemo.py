import os
import re
import csv
import logging

class MyUtility:
    def __init__(self, directoryPath, sourceIPStart):
        self.directoryPath = directoryPath
        self.sourceIPStart = sourceIPStart
    def writeCSV(self):
        try:
            header = ['Source IP', 'Environment']
            with open(self.directoryPath, 'wb') as f:
                writer = csv.writer(f)
                writer.writerow(header)
                for filename in os.listdir(os.path.dirname(self.directoryPath)):
                    if (filename.endswith(".csv") and (filename != os.path.basename(self.directoryPath))):
                        writer.writerow([(('.' + str(self.sourceIPStart)) * 4).lstrip('.')," ".join(re.findall('[a-z]+',os.path.splitext(filename)[0],flags=re.IGNORECASE))])
                        self.sourceIPStart+=1
                        continue
                    else:
                        continue
        except Exception as e:
            logging.exception("An exception was thrown!")

givenPath = raw_input("Enter valid File Path :")
if os.path.isdir(os.path.dirname(givenPath)):
    objMyUtility = MyUtility(givenPath,1)
    objMyUtility.writeCSV()
else:
    logging.exception("Invalid Path..Please provide correct Path")
