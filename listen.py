import speech_recognition as sr

# obtain audio from the microphone

r = sr.Recognizer()
with sr.Microphone(device_index=0) as source:
  while True:
    audio = r.listen(source)
    try:
      text = r.recognize_google(audio)
      with open("spch_to_text.txt", "wb") as f:
        for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
          if text:
            f.write(text)
            print(text)
    except:
      with open("spch_to_text.txt", "wb") as f:
        for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
          if text:
            f.write("no audio")
            print("no audio")
