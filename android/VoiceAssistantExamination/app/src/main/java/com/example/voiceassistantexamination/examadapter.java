package com.example.voiceassistantexamination;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.ArrayList;

public class examadapter extends RecyclerView.Adapter<examadapter.ViewHolder>{
    private  listdata[] obj;
    examadapter(listdata[] obj){
        this.obj=obj;
    }

    @NonNull
    @Override
    public examadapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View listItem= layoutInflater.inflate(R.layout.examlist, parent, false);
        ViewHolder viewHolder = new ViewHolder(listItem);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(@NonNull examadapter.ViewHolder holder, int position) {
        final listdata data =obj[position];
        holder.a.setText(data.getExamname());
        holder.b.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent I=new Intent(view.getContext(),MainActivity4.class);
                Bundle b=new Bundle();
                b.putString("questionpapername", holder.a.getText().toString());
                I.putExtras(b);
                view.getContext().startActivity(I);
            }
        });
    }

    @Override
    public int getItemCount() {
        return obj.length;
    }

    public class ViewHolder  extends RecyclerView.ViewHolder {
        public TextView a;
        public Button b;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            this.a=itemView.findViewById(R.id.textView4);
            this.b=itemView.findViewById(R.id.button4);
        }
    }
}
