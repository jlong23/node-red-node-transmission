# node-red-node-transmission

A set of Node Red nodes to access the Transmission torrent client remote API

## Dependencies

Depends on nodejs package transmission v0.4.9: <https://github.com/FLYBYME/node-transmission>

## Nodes Defined (3)

1. Transmission List Torrents:
   * Gets the current torrent list JSON data from the Transmission Instance.
   * Returns an Array of the RPC JSON data in msg.payload with a msg.topic of '/transmission.v1/torrentData'
   * See the 3.3 Torrent Accessors section of the RPC-Spec (<https://trac.transmissionbt.com/browser/trunk/extras/rpc-spec.txt>)

2. Transmission Add Torrent:
   * Adds a new torrent via the config panel URL field or msg.url payload value containing a .torrent file or a magnet URL reference.
   * Returns a single instance of the RPC JSON data in msg.payload with a msg.topic of '/transmission.v1/torrentAdd'
   * See the 3.3 Torrent Accessors section of the RPC-Spec (<https://trac.transmissionbt.com/browser/trunk/extras/rpc-spec.txt>)

3. Transmission Remove Torrent:
   * Remove a torrent from download queue
   * NOTE : This does not trash torrent data i.e. does not remove it from disk
   * Remove a torrent via the hashString value of a torrent in Transmission using 'msg.ids'.
   * Returns an empty object in msg.payload with a msg.topic of '/transmission.v1/torrentRemove'
   * See the 3.3 Torrent Accessors section of the RPC-Spec (<https://trac.transmissionbt.com/browser/trunk/extras/rpc-spec.txt>)

## To Do

1. [ ] Add the other Transmission functions from <https://github.com/FLYBYME/node-transmission>

## Authors & Contributors

* **Jay Long** - *Author for the Initial build* - [jlong23](https://github.com/jlong23)
* **Miguel Coquet** - *Corrections & Bugfixes* - [mcoquet](https://github.com/mcoquet)
* **Mark Funston** - *Further Documentation and Enhancements* - [mlfunston](https://github.com/mlfunston)

## License

This project is licensed under the Apache License, Version 2.0 - see the [LICENSE](LICENSE.md) file for details

## Changelog

### v0.1.0 (latest)

* Updated minor release version
* Added various documentation
* Included code fixes to allow url to be sent to the add torrent function via msg.url
* Moved the nodes to the 'transmission' category
* Added Features:
  * Remove Torrent

### v0.0.1

* Original release version
* Features:
  * List Torrents
  * Add Torrent
