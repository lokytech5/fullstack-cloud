#!/bin/sh


mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip_all & 
MONGOD_PID=$!


while ! mongo --port $MONGO_REPLICA_PORT --eval "db.stats()"; do
    sleep 1
done


mongo --eval "rs.initiate({_id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }]});"


echo "REPLICA SET ONLINE"
wait $MONGOD_PID
