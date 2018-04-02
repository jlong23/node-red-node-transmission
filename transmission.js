/**
 * Copyright 2014, 2015 Andrew D Lindsay @AndrewDLindsay
 * http://blog.thiseldo.co.uk
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    "use strict";

    function TransmissionAPINode(n) {
        RED.nodes.createNode(this,n);
        var node = this;
        if (this.credentials &&
            this.credentials.hostname) {
            this.Transmission = require("transmission");
            this.TransmissionAPI = new this.Transmission({
                host: this.credentials.hostname,
                port: this.credentials.portnum,
                username: this.credentials.username,
                password: this.credentials.password
            });
            
            node.log( "Reauthenticating Transmission API with " + this.credentials.hostname );
        }
    }

    RED.nodes.registerType("transmission-config",TransmissionAPINode,{
        credentials: {
            hostname: { type:"text" },
            portnum: { type:"text" },
            username: { type:"text" },
            password: { type:"text" }
        }
    });


    function TransmissonTorrentList(n) {
        RED.nodes.createNode(this,n);
        this.config = RED.nodes.getNode(n.config);
        var node = this;
        var TransmissionAPI = this.config ? this.config.TransmissionAPI : null;

	if (!TransmissionAPI) {
            node.warn("Missing Transmission credentials");
            node.status({fill:"red",shape:"ring",text:"Missing Transmission credentials"});
            return;
        }

        node.status({});
        node.on("input", function(msg) {
            node.status({fill:"blue",shape:"dot",text:"Calling Transmission"});

            TransmissionAPI.get(function(err, result) {
                if (err) {
                    node.error("failed to fetch Transmission Torrents : " + err);
                    node.log( JSON.stringify( err ));
                    
                    node.status({fill:"red",shape:"ring",text:"error"});
                    return;
                }
        
                node.status({});
    
                node.status({fill:"green",shape:"dot",text:"processing"});
    
                msg.topic = "/transmission.v1/torrentData";
                msg.payload = result;
                node.send(msg);
    
                node.status({});

            })
        })

    }
    RED.nodes.registerType("Transmission List Torrents", TransmissonTorrentList);


    function TransmissonTorrentAdd(n) {
        RED.nodes.createNode(this,n);
        this.config = RED.nodes.getNode(n.config);
        var node = this;
        var TransmissionAPI = this.config ? this.config.TransmissionAPI : null;

	    if (!TransmissionAPI) {
            node.warn("Missing Transmission credentials");
            node.status({fill:"red",shape:"ring",text:"Missing Transmission credentials"});
            return;
        }

        //this.url = n.url || msg.url || "";

        node.status({});
        node.on("input", function(msg) {
            node.log("Entering Add Torrent section");
            node.status({fill:"blue",shape:"dot",text:"Calling Transmission"});
            var url;
            var msg2 = {};
            url = msg.url || n.url;
            node.log(url);

            TransmissionAPI.addUrl(url,function(err, result) {
                if (err) {
                    node.error("failed to add Torrent Url : " + err);
                    node.log( JSON.stringify( err ));
                    
                    node.status({fill:"red",shape:"ring",text:"error"});
                    return;
                }
        
                node.status({});
    
                node.status({fill:"green",shape:"dot",text:"processing"});
    
                msg.topic = "/transmission.v1/torrentAdd";
                msg.payload = result;
                node.send(msg);
    
                node.status({});

            })
        })

    }
    RED.nodes.registerType("Transmission Add Torrent", TransmissonTorrentAdd);
   
    function TransmissonTorrentRemove(n) {
        RED.nodes.createNode(this,n);
        this.config = RED.nodes.getNode(n.config);
        var node = this;
        var TransmissionAPI = this.config ? this.config.TransmissionAPI : null;

	if (!TransmissionAPI) {
            node.warn("Missing Transmission credentials");
            node.status({fill:"red",shape:"ring",text:"Missing Transmission credentials"});
            return;
        }

        //this.url = n.url || msg.url || "";

        node.status({});
        node.on("input", function(msg) {
            node.log("Entering Remove Torrent section");
            node.status({fill:"blue",shape:"dot",text:"Calling Transmission"});
            var ids;
            var msg2 = {};
            ids = msg.ids || n.ids;
            node.log(ids);

            TransmissionAPI.remove(ids,function(err, result) {
                if (err) {
                    node.error("failed to select Torrent ids : " + err);
                    node.log( JSON.stringify( err ));
                    
                    node.status({fill:"red",shape:"ring",text:"error"});
                    return;
                }
        
                node.status({});
    
                node.status({fill:"green",shape:"dot",text:"processing"});
    
                msg.topic = "/transmission.v1/torrentRemove";
                msg.payload = result;
                node.send(msg);
    
                node.status({});

            })
        })

    }
    RED.nodes.registerType("Transmission Remove Torrent", TransmissonTorrentRemove);

}
