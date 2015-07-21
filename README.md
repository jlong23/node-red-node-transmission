# node-red-node-transmission

Depends on nodejs package transmission 0.4.2:

Nodes Defined (2):

1. Transmission Get Torrents:
  * Gets the current torrent list JSON data from the Transmission Instance.
  * Returns an Array of the RPC JSON data in msg.payload with a msg.topic of '/transmission.v1/torrentData'
  * See the 3.3 Torrent Accessors section of the RPC-Spec (https://trac.transmissionbt.com/browser/trunk/extras/rpc-spec.txt)

2. Transmission Add Torrent:
  * Adds a new torrent via the config panel URL or msg.url value of a .torrent file or a magnet reference.</p>
  * Returns a single instance of the RPC JSON data in msg.payload with a msg.topic of '/transmission.v1/torrentAdd'</p>
  * See the 3.3 Torrent Accessors section of the RPC-Spec (https://trac.transmissionbt.com/browser/trunk/extras/rpc-spec.txt)

