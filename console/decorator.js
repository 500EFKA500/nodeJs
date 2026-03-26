// декоратор

class ConsoleDecorator {
    static drawLine(lines, format){
        if(format === 1){
            console.log(`-`.repeat(lines));
        }
        else if(format === 2){
            console.log(`+`.repeat(lines));
        }   
        else if(format === 3){
            console.log(`_`.repeat(lines));
        }            
        else{
            console.log(`=`.repeat(lines))
        }
    }

    static showAllFormatNotes(notes){
        notes.forEach((note) => this.showFormatNote(note));
    }

    static showFormatNote(note){
        this.drawLine(30, 1);
        console.log(`номер задачи: [${note.id}]`);
        console.log(`\nимя задачи: ${note.title}`);
        this.drawLine(30, 1);
        console.log(`цель: ${note.content}`);
        console.log(`\n[${note.date}]`);
        this.drawLine(30, 1);
    }
}

module.exports = ConsoleDecorator;