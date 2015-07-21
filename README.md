# node-red-node-transmission

Depends on nodejs package transmission 0.4.2:

Nodes:
Transmission Get Torrents -
    <p>Gets the current torrent list JSON data from the Transmission Instance.</p>
    <p>Returns an Array of the RPC JSON data in msg.payload with a msg.topic of '/transmission.v1/torrentData'</p>
    <p>See the 3.3 Torrent Accessors section of the RPC-Spec <a href="https://trac.transmissionbt.com/browser/trunk/extras/rpc-spec.txt" target="_blank">https://
trac.transmissionbt.com/browser/trunk/extras/rpc-spec.txt</a>

Transmission Add Torrent -
    <p>Adds a new torrent via the config panel URL or msg.url value of a .torrent file or a magnet reference.</p>
    <p>Returns a single instance of the RPC JSON data in msg.payload with a msg.topic of '/transmission.v1/torrentAdd'</p>
    <p>See the 3.3 Torrent Accessors section of the RPC-Spec <a href="https://trac.transmissionbt.com/browser/trunk/extras/rpc-spec.txt" target="_blank">https://trac.transmissionbt.com/browser/trunk/extras/rpc-spec.txt</a>

