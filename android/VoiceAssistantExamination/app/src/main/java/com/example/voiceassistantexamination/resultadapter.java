package com.example.voiceassistantexamination;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class resultadapter extends RecyclerView.Adapter<resultadapter.ViewHolder>{
    private  listdata[] obj;
   resultadapter(listdata[] obj){
        this.obj=obj;
    }

    @NonNull
    @Override
    public resultadapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View listItem= layoutInflater.inflate(R.layout.resultlist, parent, false);
        ViewHolder viewHolder = new ViewHolder(listItem);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(@NonNull resultadapter.ViewHolder holder, int position) {
        final listdata data =obj[position];
        holder.a.setText(data.getExamname());
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
            this.a=itemView.findViewById(R.id.textView3);
            this.b=itemView.findViewById(R.id.button3);
        }
    }
}
