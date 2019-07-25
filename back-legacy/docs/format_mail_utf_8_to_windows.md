# Reformat a .txt

# Why?
Encoding on linux computer is done on UTF-8, while users are on windows and use encoding **windows-1252**


# How?
On a bash console:

```bash

iconv -f UTF-8 -t windows-1252 linux_mail.txt > mail_formatted.txt
``` 