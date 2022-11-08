/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable no-shadow */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
const { response } = require('@hapi/hapi/lib/validation');
const { nanoid } = require('nanoid');
const notes = require('./notes');

/* eslint-disable semi */
// eslint-disable-next-line consistent-return
const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16)
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
      };

      notes.push(newNote);
      const isSuccess = notes.filter((note) => note.id === id).length > 0;

      if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
              noteId: id,
            },
        });
        response.code(201);
        return response;
      } else {
        const response = h.response({
            status: 'fail',
            message: 'Catatan gagal di tambahkan',
        });
        response.code(500);
        return response;
      }
}

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      notes,
    },
  });

  // eslint-disable-next-line consistent-return
  const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    // eslint-disable-next-line no-shadow
    const note = notes.filter((note) => note.id === id)[0];
    if (note !== undefined) {
      return {
        status: 'success',
        data: {
          note,
        },
      }
    }

    // eslint-disable-next-line no-shadow
    const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
      notes[index] = {
        ...notes[index],
        title,
        tags,
        body,
        updatedAt,
      };

      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil di perbarui',
      })
      response.code(200);
      return response;
    }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
  }

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil di hapus',
    })
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak di temukan',
  });

  response.code(404);
  return response;
}
module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };
