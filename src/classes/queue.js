class Queue {
    constructor() {
        this.members = [];
    }

    enqueue(member) {
        this.members.push(member);
    }

    dequeue() {
        return this.members.shift();
    }

    isEmpty() {
        return this.members.length === 0;
    }

    getSize() {
        return this.members.length;
    }
}

const queue = new Queue();
export default queue;
