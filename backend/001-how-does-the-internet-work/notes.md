<!-- node: B-introduction-how-does-the-internet-work -->
# How does the internet work?

**Tree:** backend · Introduction · **Started:** 2026-10-08 · **Status:** done

## In my own words
<!-- Write this AFTER reading/watching, with the sources CLOSED. If you can't, you're not done reading. -->


## What I built
<!-- One or two lines on the code in this folder. Concept-only node? Write "notes only". -->


## What tripped me up
<!-- The part that didn't click at first. This is gold for interviews and LinkedIn posts. -->


## Claude test
<!-- Paste the "test me" message from the tree, answer cold, then log it here. -->
- **Date:** 2026-10-07 (cold, voice-to-text, ~60s)
- **Result:** redo
- **Weak spot it found:** DNS was missing completely: no step that turns `focusdownapp.com` into an IP address. Also: TCP and TLS were blurred into "packets to see if the connection exists"; no routers/ISP hops; no HTTP request → response → browser render. Wrong claim: "because of secure protocols it doesn't need to send the full thing" (HTTPS encrypts, it doesn't shrink; caching and compression do that).
- **Follow-up push (DNS, cold):** named DNS and guessed "there has to be a protocol", but said it gets *my own* IP (it's the server's) and had no lookup chain. Real trace, 2026-10-07: router 10.0.0.1 → root server → .com server → Porkbun nameserver → `69.46.46.28`. Re-test DNS cold after writing "In my own words".
- **Re-test (same day, ~10 min after seeing the dig trace, notes still unwritten):** redo, but much closer. DNS chain now present (router/resolver → root → nameserver → IP → TCP handshake). Hesitant on resolver vs root and skipped the .com step. Still missing: the HTTP request/response (the browser never *asks* for the page), routers/ISP hops, and TLS as a separate step ("encrypted and cached and streamed" got mixed together).
- **HTTP push:** didn't know it ("browser sends a packet request, it sends some back"). Taught from a real `curl -v https://focusdownapp.com`: `GET / Host: focusdownapp.com` → `HTTP/2 200`, 71 KB of HTML from Express on Railway (not Porkbun: Porkbun only answers DNS). The HTML then triggers more requests (app-icon.png, Google Fonts, the energy webp). Next test: whole question cold, HTTP included.

## Sources I used
-
