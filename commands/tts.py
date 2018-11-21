import gtts
import sys
import os
import random

if not os.path.isdir("tts_cache"):
    os.mkdir("tts_cache")

save = "tts_cache/"+str(random.randint(10000, 99999))+".mp3"
while os.path.isfile(save):
    save = "tts_cache/"+str(random.randint(10000, 99999))+".mp3"

gtts.gTTS(text=sys.argv[1], lang="de").save(save)

sys.stdout.write(save.split("/")[-1])
sys.stdout.flush()
