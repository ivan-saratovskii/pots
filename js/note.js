$(document).ready(function() {

	function AppViewModel() {
	    var self = this;

	    self.newNote = ko.observable('');
	    self.notes = ko.observableArray([]);

	    // Добавление новой заметки
	    self.addNote = function() {
	        if (self.newNote()) {
	            self.notes.push(self.newNote());
	            self.newNote('');
	        }
	    };

	    // Сохранение заметок в файл
	    self.saveNotes = function() {
	        const blob = new Blob([JSON.stringify(self.notes())], { type: 'application/json' });
	        const url = URL.createObjectURL(blob);

	        const a = document.createElement('a');
	        a.href = url;
	        a.download = 'notes.json';
	        document.body.appendChild(a);
	        a.click();
	        document.body.removeChild(a);
	        URL.revokeObjectURL(url);
	    };

	    // Загрузка заметок из файла
	    self.loadNotes = function(data, event) {
	        const file = event.target.files[0];
	        if (file) {
	            const reader = new FileReader();
	            reader.onload = function(e) {
	                const contents = e.target.result;
	                const loadedNotes = JSON.parse(contents);
	                self.notes(loadedNotes); // Обновляем массив заметок
	            };
	            reader.readAsText(file);
	        }
	    };

	    // Удаление заметки
	    self.removeNote = function(note) {
	        self.notes.remove(note);
	    };
	}

	// Применение Knockout.js
	ko.applyBindings(new AppViewModel());

});
