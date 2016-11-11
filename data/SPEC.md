# Data File Format Specification

|Aspect|Detail|
|------|------|
|Version|0.4|
|Written by|GochoMugo <mugo@forfuture.co.ke>|

The data used in the application in its computations is fed through data files
placed in this directory. This allows the application logic code remain
independent of the different networks available.

## spec:

The data files are written in [JSON][json] format.


<a name="type-network"></a>
### Network

A single data file can **only** hold one [Network](#type-network) object.

|Key|Type|Description|
|---|----|-----------|
|name|[Name](#type-name)|Name of the Network|
|meta|[Metadata](#type-metadata)|Metadata associated with the network|
|transactions|\[[Transaction](#type-transaction)]|Transactions supported by the network|
|ussd_codes|\[[USSDCode](#type-ussdcode)]|The available shortcodes|


<a name="type-metadata"></a>
### Metadata

|Key|Type|Description|
|---|----|-----------|
|spec|String|Specification version the file adheres to|
|date_updated|[Date](#type-date)|Date on which the data was last updated|
|url|String|A valid URL to the network's homepage, preferably to the page concerning money transactions|


<a name="type-transaction"></a>
### Transaction

|Key|Type|Description|
|---|----|-----------|
|name|[Name](#type-name)|Type of the transaction|
|classes|\[[Class](#type-class)]|The different classes of the transaction|
|amount_input|boolean|`false` if an amount, as input to the transaction, is **not** applicable. *Defaults to `true`.*|


<a name="type-class"></a>
### Class

|Key|Type|Description|
|---|----|-----------|
|name|[Name](#type-name)|Name of the class of the transaction|
|ranges|\[[Range](#type-range)]|The ranges in the transaction class|
|amount|[Cost](#type-cost)|Amount charged to the user. *This should be provided __only__ if parent `Transaction` has `amount_input` set to `false`.*|
|message|String|*Optional.* Accompanying message for any raised errors, due to `amount`|


<a name="type-range"></a>
### Range

|Key|Type|Description|
|---|----|-----------|
|low|[Cost](#type-cost)|Lower-bound of the Range|
|high|[Cost](#type-cost)|Upper-bound of the Range|
|amount|[Cost](#type-cost)|Amount charged to user|


### Cost
<a name="type-cost"></a>

This type is based on the native `Number` type in JSON with these few
additions:

* `"-Infinity"`: implies `-Infinity`
* `"+Infinity"`: implies `+Infinity`
* `-1`: raises `AmountNotAllowedError`, inferring that the provided
  amount is **forbidden** for this transaction
* `-2`: raises `AmountNotFoundError`, inferring that the amount for
  this transaction can **not** be determined using our data (depends on
  external factors, e.g. merchant reputation)
* **no** fractional part

Therefore, the cost is accurate to **1 KES**.


<a name="type-ussdcode"></a>
### USSDCode

This is a [USSD][ussd] code, supported by the network.

|Key|Type|Description|
|---|----|-----------|
|code|string|The actual USSD code. For example, `*144#`|
|description|string|Describes the use of the code|


<a name="type-name"></a>
### Name

This is a string, **uniquely** identifying the named object.


<a name="type-date"></a>
### Date

Date, in `YYYY-MM-DD` format. See this [W3C document][date] for
more information.


[date]:https://www.w3.org/TR/NOTE-datetime
[json]:http://json.org
[ussd]:https://en.wikipedia.org/wiki/Unstructured_Supplementary_Service_Data
