NODE_PID_FILE	=	node.server.pid
GO_PID_FILE		=	go.server.pid

NODE:	$(NODE_PID_FILE) 
GO:	$(GO_PID_FILE)


install:
	npm install
	webpack --config webpack.config.js --progress --colors --bail
	

start:
	make stop || true
	make NODE
	make GO
	open http://localhost:5001/static/build


$(NODE_PID_FILE):
	{ node hot.proxy & echo $$! > $@; } > /dev/null

$(GO_PID_FILE):
	cd server &&  go build -o ./bin/server && { ./bin/server & echo $$! > $@; }

KILL_NODE:
		kill `cat $(NODE_PID_FILE)` && rm $(NODE_PID_FILE) || true


KILL_GO:
	cd server && kill `cat $(GO_PID_FILE)` && rm $(GO_PID_FILE) || true
	cd server && rm ./bin/server || true
	cd server && rmdir ./bin || true


stop:
	make KILL_NODE || true
	make KILL_GO || true


	
.PHONY:	start stop node.server.pid go.server.pid
