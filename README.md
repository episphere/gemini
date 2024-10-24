# gemini
Exploring Google Gemini's APIs 

Live at https://episphere.github.io/gemini !

# chatbot

For a simple example digesting information about the Connect study try

```javascript
(await import("https://episphere.github.io/gemini/chat.mjs")).chat()
```
To specify the reference document and the target DOM element (if you leave it null it will create a hosting div):

```javascript
(await import("https://episphere.github.io/gemini/chat.mjs")).chat(null,'https://episphere.github.io/gemini/TCGA-BP-5195.25c0b433-5557-4165-922e-2c1eac9c26f0.txt')
```
In either case you can also retrie the reference document by clicking on [source].

Issues and improvement suggestions equally welcome at https://github.com/episphere/gemini/issues.
