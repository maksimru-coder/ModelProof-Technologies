# BiasRadar Logging - Visual Example

## What You'll See in Vercel Logs

When users interact with BiasRadar, you'll see detailed logs like this:

### Scan Button Click
```
[BIASRADAR SCAN] 2025-11-04 14:23:45 UTC | IP: 203.0.113.42 | User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 | Text Length: 156 chars | Bias Types: gender, race, age, disability, lgbtq, religion, socioeconomic, culture, intersectional, political, ideological_neutrality, truth_seeking
```

### Fix Button Click
```
[BIASRADAR FIX] 2025-11-04 14:24:12 UTC | IP: 203.0.113.42 | User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 | Text Length: 156 chars
```

### Multiple Users
```
[BIASRADAR SCAN] 2025-11-04 14:30:15 UTC | IP: 198.51.100.23 | User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 | Text Length: 89 chars | Bias Types: gender, race
[BIASRADAR SCAN] 2025-11-04 14:31:02 UTC | IP: 192.0.2.156 | User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) | Text Length: 234 chars | Bias Types: gender, race, age, disability, lgbtq
[BIASRADAR FIX] 2025-11-04 14:31:45 UTC | IP: 192.0.2.156 | User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) | Text Length: 234 chars
[BIASRADAR SCAN] 2025-11-04 14:35:21 UTC | IP: 203.0.113.99 | User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 | Text Length: 512 chars | Bias Types: gender, race, age, disability, lgbtq, religion, socioeconomic, culture, intersectional, political, ideological_neutrality, truth_seeking
```

## How to Read the Logs

| Field | Example | What It Tells You |
|-------|---------|-------------------|
| **Action** | `[BIASRADAR SCAN]` | Which button was clicked (Scan or Fix) |
| **Timestamp** | `2025-11-04 14:23:45 UTC` | Exact time of the action |
| **IP Address** | `203.0.113.42` | User's location identifier |
| **User-Agent** | `Mozilla/5.0 (Windows NT 10.0...)` | Browser, OS, device type |
| **Text Length** | `156 chars` | Size of text analyzed |
| **Bias Types** | `gender, race, age` | Categories selected (Scan only) |

## Getting Location from IP

Use ipinfo.io to convert IP to location:

**Example:**
- IP: `203.0.113.42` → Look up at https://ipinfo.io/203.0.113.42
- Result: San Francisco, CA, United States

**Common User-Agent Patterns:**
- `Windows NT 10.0` = Windows 10/11
- `Macintosh; Intel Mac OS X 10_15_7` = macOS
- `iPhone; CPU iPhone OS 17_0` = iPhone
- `X11; Linux x86_64` = Linux Desktop
- `Android` = Android phone/tablet

## Analytics You Can Track

From these logs, you can analyze:
- ✅ **Usage patterns** - Peak usage times, daily/weekly trends
- ✅ **Geographic reach** - Which countries/regions use BiasRadar
- ✅ **Device distribution** - Desktop vs mobile usage
- ✅ **Feature adoption** - Scan vs Fix button usage ratio
- ✅ **Content length** - Average text size being analyzed
- ✅ **Bias type preferences** - Which categories users check most

## Example Analytics Queries

### Total Scans Today
Count all `[BIASRADAR SCAN]` entries with today's date

### Most Active User
Find IP address with most log entries

### Average Text Length
Calculate mean of all "Text Length: X chars" values

### Mobile vs Desktop
Count User-Agents containing "iPhone|Android" vs others

### Peak Hours
Group timestamps by hour to find busiest times
